/**
 * @fileoverview every addEventListener should have a matching removeEventListener in the same useEffect block
 * @author AndreaPontrandolfo
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/ensure-matching-remove-event-listener"),
  RuleTester = require("eslint").RuleTester;

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
  },
});

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("ensure-matching-remove-event-listener", rule, {
  valid: [
    `useEffect(() => {
      doThis();
      doMoreOfThis();
      window.addEventListener("keydown", handleUserKeyPress);
      doOtherStuff();
      doSomeOtherStuff();
      return () => {
        doThatBefore();
        doMoreOfThatBefore();
        window.removeEventListener("keydown", handleUserKeyPress);
        doThatAfter();
        doMoreOfThatAfter();
      };
    }, [])`,
  ],

  invalid: [
    {
      code: `useEffect(() => {
        doThis();
        doMoreOfThis();
        window.addEventListener("keydown", handleUserKeyPress);
        doOtherStuff();
        doSomeOtherStuff();
        return () => {
          doThat();
          doMoreOfThat();
        };
      }, [])`,
      errors: [
        {
          message: "Missing a matching removeEventListener.",
          type: "ExpressionStatement",
        },
      ],
    },
    {
      code: `useEffect(() => {
        doThis();
        doMoreOfThis();
        window.addEventListener("keydown", handleUserKeyPress);
        doOtherStuff();
        doSomeOtherStuff();
      }, [])`,
      errors: [
        {
          message: "Missing a cleanup function for the addEventListener.",
          type: "ExpressionStatement",
        },
      ],
    },
  ],
});
