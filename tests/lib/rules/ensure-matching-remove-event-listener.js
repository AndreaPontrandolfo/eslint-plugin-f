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
    `useEffect(() => {
      refcurrent = value;
    }, [value]);`,
  ],

  invalid: [
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
          messageId: "required-cleanup",
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
        return () => {
          doThat();
          doMoreOfThat();
        };
      }, [])`,
      errors: [
        {
          messageId: "required-remove-eventListener",
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
        return () => {
          doThat();
          window.addEventListener("keydown", handleUserKeyPress);
          doMoreOfThat();
        };
      }, [])`,
      errors: [
        {
          messageId: "required-remove-eventListener",
          type: "ExpressionStatement",
        },
      ],
    },
  ],
});
