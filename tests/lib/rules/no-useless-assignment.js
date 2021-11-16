/**
 * @fileoverview Disallow the reassignment of a variable that was declared in the immediately previous line.
 * @author AndreaPontrandolfo
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/no-useless-assignment"),
  RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester();
ruleTester.run("no-useless-assignment", rule, {
  valid: [
    `let myVariable = "something";
     const myFunction = () => {
       let myNewVariable = "something";
    }`,
    `export const clearSearchInput = () => {
      let input = document.querySelector("#autoComplete");
      input.value = "";
    };`,
    `export const clearSearchInput = () => {
      let input = document.querySelector("#autoComplete");
      input.value = "";
      input = myNewThing()
    };`,
  ],

  invalid: [
    {
      code: `let myVariable = "something";
            myVariable = "something else";
            const myFunction = () => {
            let myNewVariable = "something";
     }`,
      errors: [{ messageId: "no-useless-assign", type: "VariableDeclaration" }],
    },
    {
      code: `export const clearSearchInput = () => {
        let input = document.querySelector("#autoComplete");
        input = myNewThing()
        input.value = "";
      };`,
      errors: [{ messageId: "no-useless-assign", type: "VariableDeclaration" }],
    },
  ],
});
