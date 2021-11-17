# Disallow the reassignment of a variable that was declared in the immediately previous line. (no-useless-assignment)

This rules flags whenever a variable re-assignment is detected right after the variable declaration.   

## Rule Details

This rule aims to fix this behaviour, because the re-assignment renders completely useless the initialization of the variable in the declaration, so might aswell assign the correct value to the variable right away.

Examples of **incorrect** code for this rule:

```js

let myVariable = "useless value";
myVariable = "correct value";

```

Examples of **correct** code for this rule:

```js

let myVariable = "correct value";

// some code in between...

myVariable = "changed value";

```

## When Not To Use It

You don't need this rules if you want to allow developers to immediately re-assign values to variables.
