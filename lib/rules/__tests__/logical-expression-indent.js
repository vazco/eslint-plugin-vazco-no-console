"use strict";

var rule = require("../logical-expression-indent"),
    RuleTester = require("eslint").RuleTester;

var ruleTester = new RuleTester();

ruleTester.run("logical-expression-indent", rule, {
    valid: [
        {
            code: [
                'if(',
                '  condition1 &&',
                '  condition2',
                '){}'
            ].join('\n'),
            options: [2, {IfStatement: 1}]
        },
        {
            code: [
                'if(',
                '  condition1 && condition2',
                '){}'
            ].join('\n'),
            options: [2, {IfStatement: 1}]
        },
        {
            code: [
                'if(',
                '    condition1 && condition2 || condition3',
                '){}'
            ].join('\n'),
            options: [4, {IfStatement: 1}]
        },
        {
            code: [
                'if(',
                '    condition0 && condition1 ||',
                '    condition2 && condition3',
                '){}'
            ].join('\n'),
            options: [4, {IfStatement: 1}]
        },
        {
            code: [
            '  if(',
            '    condition1 && condition2 ||',
            '    condition3 && condition4 || condition5 &&',
            '    condition6' ,
            '  ){}'
            ].join('\n'),
            options: [2, {IfStatement: 1}]
        },
        {
            code: [
                'if(',
                '  isValidCondition(condition1) && condition2 ||',
                '  isValidCondition(condition3) && condition4 ||',
                '  isValidCondition(condition5) && condition6',
                '){}'
            ].join('\n'),
            options: [2, {IfStatement: 1}]
        },
        // Other tests
        {
            code: '    condition1 && condition2',
            options: [4, {IfStatement: 1}]
        },
        {
            code: [
                'if(',
                '  condition1 &&',
                '  condition2',
                '){}'
            ].join('\n'),
            options: [2, {IfStatement: 1}]
        },
        {
            code: [
            '  if(condition1 && condition2){}'
            ].join('\n'),
            options: [2, {IfStatement: 1}]
        },
        {
            code: [
            'if(condition1 && condition2) console.log(\'Eureka\')'
            ].join('\n'),
            options: [2, {IfStatement: 1}]
        }
    ],
    invalid: [
        {
            code: [
                'if(',
                'condition1 &&',
                'condition2',
                '){}'
            ].join('\n'),
            output: [
                'if(',
                '  condition1 &&',
                '  condition2',
                '){}'
            ].join('\n'),
            errors: [{message: /^Expected indentation of/}, {message: /^Expected indentation of/}],
            options: [2, {IfStatement: 1}]
        },
        {
            code: [
                'if(',
                'condition1 && condition2',
                '){}'
            ].join('\n'),
            output: [
                'if(',
                '  condition1 && condition2',
                '){}'
            ].join('\n'),
            errors: [{message: /^Expected indentation of/}],
            options: [2, {IfStatement: 1}]
        },
        {
            code: [
                'if(',
                'condition1 && condition2 || condition3',
                '){}'
            ].join('\n'),
            output: [
                'if(',
                '    condition1 && condition2 || condition3',
                '){}'
            ].join('\n'),
            errors: [
                {message: /^Expected indentation of/}
            ],
            options: [4, {IfStatement: 1}]
        },
        {
            code: [
                'if(',
                'condition0 && condition1 ||',
                'condition2 && condition3',
                '){}'
            ].join('\n'),
            output: [
                'if(',
                '    condition0 && condition1 ||',
                '    condition2 && condition3',
                '){}'
            ].join('\n'),
            errors: [
                {message: /^Expected indentation of/},
                {message: /^Expected indentation of/},
                {message: /^Expected indentation of/},
                {message: /^Expected indentation of/}
            ],
            options: [4, {IfStatement: 1}]
        },
        {   code: [
            '  if(',
            '  condition1 && condition2 ||',
            '    condition3 && condition4 || condition5 &&',
            'condition6' ,
            '  ){}'
            ].join('\n'),
            output: [
            '  if(',
            '    condition1 && condition2 ||',
            '    condition3 && condition4 || condition5 &&',
            '    condition6' ,
            '  ){}'
            ].join('\n'),
            errors: [
                {message: /^Expected indentation of/},
                {message: /^Expected indentation of/},
                {message: /^Expected indentation of/},
                {message: /^Expected indentation of/},
            ],
            options: [2, {IfStatement: 1}]
        },
        {
            code: [
                'if(',
                'isValidCondition(condition1) && condition2 ||',
                '    isValidCondition(condition3) && condition4 ||',
                'isValidCondition(condition5) && condition6',
                '){}'
            ].join('\n'),
            output: [
                'if(',
                '  isValidCondition(condition1) && condition2 ||',
                '  isValidCondition(condition3) && condition4 ||',
                '  isValidCondition(condition5) && condition6',
                '){}'
            ].join('\n'),
            errors: [
                {message: /^Expected indentation of/},
                {message: /^Expected indentation of/},
                {message: /^Expected indentation of/},
                {message: /^Expected indentation of/},
                {message: /^Expected indentation of/},
                {message: /^Expected indentation of/},
                {message: /^Expected indentation of/}
            ],
            options: [2, {IfStatement: 1}]
        },
        // Other tests
        {
            code: [
                'if(',
                'isValidCondition(condition)',
                '){}'
            ].join('\n'),
            output: [
                'if(',
                '    isValidCondition(condition)',
                '){}'
            ].join('\n'),
            errors: [{message: /^Expected indentation of/}],
            options: [4, {IfStatement: 1}]
        },
    ]
});
