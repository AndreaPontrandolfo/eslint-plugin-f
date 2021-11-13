/**
 * @fileoverview every addEventListener should have a matching removeEventListener in the same useEffect block
 * @author AndreaPontrandolfo
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/**
 * @type {import('eslint').Rule.RuleModule}
 */
module.exports = {
  meta: {
    type: `problem`, // `problem`, `suggestion`, or `layout`
    docs: {
      description:
        "every addEventListener should have a matching removeEventListener in the same useEffect block",
      category: "Fill me in",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
  },

  create(context) {
    // variables should be defined here

    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    // any helper functions should go here or else delete this section

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      ExpressionStatement(node) {
        let hasAddEventListener = null;
        let hasReturnStatement = null;
        let hasRemoveEventListener = null;
        const expression = node && node.expression;
        const calleeName =
          expression && expression.callee && expression.callee.name;
        if (calleeName === "useEffect") {
          const internalExpressions =
            expression &&
            expression.arguments &&
            expression.arguments.length > 0 &&
            expression.arguments[0].body &&
            expression.arguments[0].body.body;
          if (internalExpressions && internalExpressions.length > 0) {
            internalExpressions.every((element, index) => {
              console.log("FIRST LOOP...");
              if (hasRemoveEventListener) {
                return false;
              }
              console.log("FIRST LOOP INDEX...", index);
              const elementType = element.type;
              const internalExpression = element.expression;
              const internalExpressionCallee =
                internalExpression && internalExpression.callee;
              const internalExpressionCalleeObject =
                internalExpressionCallee &&
                internalExpressionCallee.object &&
                internalExpressionCallee.object.name;
              const internalExpressionCalleeProperty =
                internalExpressionCallee &&
                internalExpressionCallee.property &&
                internalExpressionCallee.property.name;
              // const firstFunctionArgument = internalExpression.arguments[0].value;
              if (
                internalExpressionCalleeObject === "window" &&
                internalExpressionCalleeProperty === "addEventListener"
              ) {
                console.log("HAS ADD_EVENT_LISTENER...");
                hasAddEventListener = true;
                return true;
              }
              if (hasAddEventListener) {
                if (elementType === "ReturnStatement") {
                  console.log("PASSING IN RETURN...");
                  hasReturnStatement = true;
                  const returnBlockBody =
                    element.argument &&
                    element.argument.body &&
                    element.argument.body.body;
                  returnBlockBody &&
                    returnBlockBody.length > 0 &&
                    returnBlockBody.every((returnElement) => {
                      console.log("SECOND LOOP...");
                      if (hasRemoveEventListener) {
                        return false;
                      }
                      const returnElementCallee =
                        returnElement.expression &&
                        returnElement.expression.callee;
                      const returnElementCalleeObject =
                        returnElementCallee &&
                        returnElementCallee.object &&
                        returnElementCallee.object.name;
                      const returnElementCalleeProperty =
                        returnElementCallee &&
                        returnElementCallee.property &&
                        returnElementCallee.property.name;
                      if (
                        returnElementCalleeObject === "window" ||
                        returnElementCalleeProperty === "removeEventListener"
                      ) {
                        console.log("HAS REMOVE_EVENT_LISTENER...");
                        console.log("good...");
                        hasRemoveEventListener = true;
                        return true;
                      }
                    });
                }
              }
              return true;
            });
          }

          if (!hasRemoveEventListener) {
            console.log(
              "🚀 ~ file: ensure-matching-remove-event-listener.js ~ line 125 ~ ExpressionStatement ~ hasRemoveEventListener",
              hasRemoveEventListener
            );
            if (!hasReturnStatement) {
              console.log(
                "🚀 ~ file: ensure-matching-remove-event-listener.js ~ line 130 ~ ExpressionStatement ~ hasReturnStatement",
                hasReturnStatement
              );
              console.log("no return, bad...");
              context.report({
                node,
                message:
                  "Add the matching removeEventListener in the cleanup function.",
              });
            } else {
              console.log("bad...");
              context.report({
                node,
                message: "Add the matching removeEventListener.",
              });
            }
          }
        }
      },
    };
  },
};
