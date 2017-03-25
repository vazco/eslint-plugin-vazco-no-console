/**
 * @fileoverview Rule to check conditional expression indent
 * @author Jan Owsiany
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
    meta: {
        docs: {
            description: "enforce consistent indentation in logical expressions",
            category: "Stylistic Issues",
            recommended: false
        },

        fixable: "whitespace",

        schema: [
            {
                oneOf: [
                    {
                        enum: ["tab"]
                    },
                    {
                        type: "integer",
                        minimum: 0
                    }
                ]
            },
            {
                type: "object",
                properties: {
                    IfStatement: {
                        type: "integer",
                        minimum: 0,
                        maximum: 1
                    }
                },
                additionalProperties: false
            }
        ]
    },

    create(context) {
        const expressionIndentStore = {};
        const sourceCode = context.getSourceCode();
        let indentType = "space";
        let indentSize = 4;

        if (context.options.length) {
            if (context.options[0] === "tab") {
                indentSize = 1;
                indentType = "tab";
            } else {
                indentSize = context.options[0];
                indentType = "space";
            }
        }

        function isSingleLineNode(node) {
            const lastToken = sourceCode.getLastToken(node),
                startLine = node.loc.start.line,
                endLine = lastToken.loc.end.line;

            return startLine === endLine;
        }

        function getNodeIndent(node, byLastLine) {
            const token = byLastLine ? sourceCode.getLastToken(node) : sourceCode.getFirstToken(node);
            const srcCharsBeforeNode = sourceCode.getText(token, token.loc.start.column).split("");
            const indentChars = srcCharsBeforeNode.slice(0, srcCharsBeforeNode.findIndex(char => char !== " " && char !== "\t"));
            const spaces = indentChars.filter(char => char === " ").length;
            const tabs = indentChars.filter(char => char === "\t").length;

            return {
                space: spaces,
                tab: tabs,
                goodChar: indentType === "space" ? spaces : tabs,
                badChar: indentType === "space" ? tabs : spaces
            };
        }

        function expectedExpressionIndent(node, parentIndent) {
            const parentNode = node.parent;
            let expressionIndent;

            if (expressionIndentStore[parentNode.loc.start.line]) {
                return expressionIndentStore[parentNode.loc.start.line];
            }
            if (typeof parentIndent === "undefined") {
                parentIndent = getNodeIndent(parentNode).goodChar;
            }

            expressionIndent = parentIndent + indentSize;

            expressionIndentStore[parentNode.loc.start.line] = expressionIndent;
            return expressionIndent;

        }

        function createErrorMessage(expectedAmount, actualSpaces, actualTabs) {
            const expectedStatement = `${expectedAmount} ${indentType}${expectedAmount === 1 ? "" : "s"}`; // e.g. "2 tabs"
            const foundSpacesWord = `space${actualSpaces === 1 ? "" : "s"}`; // e.g. "space"
            const foundTabsWord = `tab${actualTabs === 1 ? "" : "s"}`; // e.g. "tabs"
            let foundStatement;

            if (actualSpaces > 0 && actualTabs > 0) {
                foundStatement = `${actualSpaces} ${foundSpacesWord} and ${actualTabs} ${foundTabsWord}`; // e.g. "1 space and 2 tabs"
            } else if (actualSpaces > 0) {

                // Abbreviate the message if the expected indentation is also spaces.
                // e.g. 'Expected 4 spaces but found 2' rather than 'Expected 4 spaces but found 2 spaces'
                foundStatement = indentType === "space" ? actualSpaces : `${actualSpaces} ${foundSpacesWord}`;
            } else if (actualTabs > 0) {
                foundStatement = indentType === "tab" ? actualTabs : `${actualTabs} ${foundTabsWord}`;
            } else {
                foundStatement = "0";
            }

            return `Expected indentation of ${expectedStatement} but found ${foundStatement}.`;
        }

        function report(node, needed, gottenSpaces, gottenTabs, loc, isLastNodeCheck) {
            if (gottenSpaces && gottenTabs) {

                // To avoid conflicts with `no-mixed-spaces-and-tabs`, don't report lines that have both spaces and tabs.
                return;
            }

            const desiredIndent = (indentType === "space" ? " " : "\t").repeat(needed);

            const textRange = isLastNodeCheck
                ? [node.range[1] - node.loc.end.column, node.range[1] - node.loc.end.column + gottenSpaces + gottenTabs]
                : [node.range[0] - node.loc.start.column, node.range[0] - node.loc.start.column + gottenSpaces + gottenTabs];

            context.report({
                node,
                loc,
                message: createErrorMessage(needed, gottenSpaces, gottenTabs),
                fix: fixer => fixer.replaceTextRange(textRange, desiredIndent)
            });
        }

        function isNodeFirstInLine(node, byEndLocation) {
            const firstToken = byEndLocation === true ? sourceCode.getLastToken(node, 1) : sourceCode.getTokenBefore(node),
                startLine = byEndLocation === true ? node.loc.end.line : node.loc.start.line,
                endLine = firstToken ? firstToken.loc.end.line : -1;

            return startLine !== endLine;
        }

        function checkNodeIndent(node, neededIndent) {
            const actualIndent = getNodeIndent(node, false);

            if ((actualIndent.goodChar !== neededIndent || actualIndent.badChar !== 0) && isNodeFirstInLine(node)) {
                report(node, neededIndent, actualIndent.space, actualIndent.tab);
            }
        }


        return {

            LogicalExpression(node) {
                // Skip logical expression other than if statement conditions
                if (!context.options[1][node.parent.type]) {
                    return;
                }
                // Skip inline conditions or expressions without parent
                if (!node.parent || isSingleLineNode(node.parent)) {
                    return;
                }

                const expressionIndent = expectedExpressionIndent(node);

                checkNodeIndent(node, expressionIndent);
            }
        };
    }
};
