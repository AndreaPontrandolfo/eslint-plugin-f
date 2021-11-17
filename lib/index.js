/**
 * @fileoverview misc eslint rules
 * @author AndreaPontrandolfo
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const requireIndex = require("requireindex");
const recommendedConfig = require("../configs/recommended.js");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

module.exports = {
  rules: requireIndex(__dirname + "/rules"),
  configs: {
    recommended: recommendedConfig,
  },
};
