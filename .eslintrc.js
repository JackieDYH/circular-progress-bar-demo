/*
 * @Author: Jackie
 * @Date: 2023-06-12 22:05:02
 * @LastEditTime: 2023-06-14 08:49:53
 * @LastEditors: Jackie
 * @Description: file content
 * @FilePath: /circular-progress-bar-demo/.eslintrc.js
 * @version: 
 */
module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/essential",
    // "eslint:recommended",
    // "plugin:prettier/recommended",
  ],
  parserOptions: {
    parser: "@babel/eslint-parser",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
  },
};
