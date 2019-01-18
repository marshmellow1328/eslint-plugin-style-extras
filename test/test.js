const rule = require('../lib/rules/call-arg-linebreaks');
const RuleTester = require('eslint').RuleTester;
const ruleTester = new RuleTester();

ruleTester.run(
    'call-arg-linebreaks',
    rule,
    {
        valid: [
            `
                function func(a, b) { return a+b; }
                func(a, b);
            `,
            `
                func(
                    'foo',
                    function(bar) {
                        return 'baz';
                    }
                );
            `
        ],
        invalid: [
            {
                code: `
                    function func(a, b) { return a+b; }
                    func(a,
                        b);
                `,
                errors: [
                    {
                        message: 'Function call arguments need to be on the same line or each on their own'
                    }
                ]
            },
            {
                code: `
                    function func(a, b) { return a+b; }
                    func(a, {
                        foo: 'bar'
                    })
                `,
                errors: [
                    {
                        message: 'Function call arguments need to be on the same line or each on their own'
                    }
                ]
            },
            {
                code: `
                    func(function() {
                        'foo';
                    })
                `,
                errors: [
                    {
                        message: 'Function call arguments need to be on the same line or each on their own'
                    }
                ]
            }
        ]
    }
);
