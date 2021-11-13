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

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("ensure-matching-remove-event-listener", rule, {
  valid: [
    // give me some code that won't trigger a warning
    `useEffect(() => {
      doThis();
      window.addEventListener("keydown", handleUserKeyPress);
      return () => {
        window.removeEventListener("keydown", handleUserKeyPress);
        doThat();
      };
    }, [])`,
  ],

  invalid: [
    {
      code: `useEffect(() => {
        doThis();
        window.addEventListener("keydown", handleUserKeyPress);
        return () => {
          doThat();
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
        window.addEventListener("keydown", handleUserKeyPress);
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
