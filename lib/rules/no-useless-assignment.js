/**
 * @fileoverview Disallow the reassignment of a variable that was declared in the immediately previous line.
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
    type: `problem`,
    docs: {
      description:
        "Disallow the reassignment of a variable that was declared in the immediately previous line.",
      category: "Possible Errors",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null,
    schema: [], // Add a schema if the rule has options
    messages: {
      "no-useless-assign": "No useless assignment.",
    },
  },

  create(context) {
    return {
      VariableDeclaration(node) {
        if (node) {
          const declarationKind = node.kind;
          if (declarationKind === "let") {
            const sourceCode = context.getSourceCode();
            const firstNewlineToken = sourceCode.getTokenAfter(node);
            const secondNewlineToken =
              sourceCode.getTokenAfter(firstNewlineToken);
            const fullLine = node.declarations;
            const variableName =
              fullLine && fullLine[0] && fullLine[0].id && fullLine[0].id.name;
            // ensure it's a re-assignment
            if (secondNewlineToken && secondNewlineToken.value === "=") {
              if (
                firstNewlineToken &&
                firstNewlineToken.value === variableName
              ) {
                context.report({
                  node,
                  messageId: "no-useless-assign",
                });
              }
            }
          }
        }
      },
    };
  },
};
