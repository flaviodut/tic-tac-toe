module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: 'airbnb-base',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
    "no-use-before-define": ["error", { "functions": false, "classes": true }],
    "semi": [2, "never"],
  },
};
