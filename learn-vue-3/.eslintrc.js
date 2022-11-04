module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/prettier",
    "@vue/prettier/@typescript-eslint",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    // disable the rule for all files
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "vue/comment-directive": 0,
    "@typescript-eslint/no-var-requires": "error",
  },
  overrides: [
    {
      // enable the rule specifically for TypeScript files
      files: ["*.ts", "*.tsx"],
      rules: {
        "no-unused-vars": "off",
        "@typescript-eslint/explicit-module-boundary-types": ["error"],
        "@typescript-eslint/no-unused-vars": ["error"],
        "@typescript-eslint/no-var-requires": ["error"],
      },
    },
  ],
};
