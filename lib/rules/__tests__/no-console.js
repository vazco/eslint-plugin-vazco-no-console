"use strict";

var rule = require("../no-console"),
    RuleTester = require("eslint").RuleTester;

var ruleTester = new RuleTester();
ruleTester.run("no-console", rule, {
    valid: [
        {
            code: "console.info()",
            options: [{disallow: ["log"]}]
        }
    ],
    invalid: [
        {
            code: "console.log()",
            errors: [{message: /^Unexpected console statement/}],
            options: [{disallow: ["log"]}]
        }
    ]
});
