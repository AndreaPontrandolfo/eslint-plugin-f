"use strict";

module.exports = {
  env: {
    es6: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["f"],
  rules: {
    "f/ensure-matching-remove-event-listener": 2,
    "f/no-useless-assignment": 2,
  },
};
