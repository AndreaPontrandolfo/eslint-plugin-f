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
    type: null, // `problem`, `suggestion`, or `layout`
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
        const expression = node.expression;
        const calleeName = expression.callee.name;
        const internalExpression =
          expression.arguments[0].body.body[0].expression;
        const internalExpressionCallee = internalExpression.callee;
        const internalExpressionCalleeObject =
          internalExpressionCallee.object.name;
        const internalExpressionCalleeProperty =
          internalExpressionCallee.property.name;
        const firstFunctionArgument = internalExpression.arguments[0].value;
        if (calleeName === "useEffect") {
          if (
            internalExpressionCalleeObject === "window" &&
            internalExpressionCalleeProperty === "addEventListener"
          ) {
            // code
          }
        }

        // node.declarations.forEach(function (variableDeclarator) {
        //   if (
        //     variableDeclarator.id.name == "_" &&
        //     variableDeclarator.init.type == "CallExpression" &&
        //     variableDeclarator.init.callee.name == "require"
        //   ) {
        //     context.report({
        //       node: node,
        //       message:
        //         "Prefer importing single functions over a full FP library",
        //     });
        //   }
        // });
      },
    };
    // return CallExpression(node) {
    //   const callee = node && node.callee;
    //   const objectName = callee && callee.object && callee.object.name;
    //   const propertyName = callee && callee.property && callee.property.name;

    //   if (objectName === "cy" && propertyName === "get") {
    //     const argument =
    //       node &&
    //       node.arguments &&
    //       node.arguments.length > 0 &&
    //       node.arguments[0] &&
    //       node.arguments[0].value;

    //     const argumentHasClass =
    //       argument &&
    //       (argument.match(/(\s*)\.\b\w+\b/i) ||
    //         argument.match(/^\.\b\w+\b/i));

    //     if (argumentHasClass) {
    //       return context.report({
    //         node,
    //         loc: node.arguments[0].loc,
    //         messageId: "avoidClasses",
    //       });
    //     }
    //   }
    // }
  },
};
