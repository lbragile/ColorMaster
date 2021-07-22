module.exports = {
  env: {
    es6: true,
    commonjs: true,
    node: true
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest-dom/recommended",
    "plugin:jest/recommended"
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "jest", "jest-dom"],
  rules: {
    "default-case": "warn"
  }
};
