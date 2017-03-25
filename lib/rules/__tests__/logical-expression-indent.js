"use strict";

var rule = require("../logical-expression-indent"),
    RuleTester = require("eslint").RuleTester;

var ruleTester = new RuleTester();
ruleTester.run("logical-expression-indent", rule, {
    valid: [
        {
            code: ['if(','    condition1 && condition2', '){}'].join('\n'),
            options: [4, {IfStatement: 1}]
        },
        {
            code: ['if(','  condition1 && condition2', '){}'].join('\n'),
            options: [2, {IfStatement: 1}]
        }
    ],
    invalid: [
        {
            code: ['if(','condition1 && condition2', '){}'].join('\n'),
            errors: [{message: /^Unexpected logical expression ident/}],
            options: [2, {IfStatement: 1}]
        }
    ]
});
