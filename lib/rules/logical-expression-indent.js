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

                if (getNodeIndent(node).goodChar - getNodeIndent(node.parent).goodChar !== indentSize) {
                    context.report(node, "Unexpected logical expression ident");
                }
            }
        };
    }
};
