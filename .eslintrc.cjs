/** @type {import("eslint").Linter.Config} */
const config = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  plugins: ["@typescript-eslint", "unused-imports", "import"],
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:react-server-components/recommended",
    "plugin:@dword-design/import-alias/recommended",
  ],

  rules: {
    // These opinionated rules are enabled in stylistic-type-checked above.
    // Feel free to reconfigure them to your own preference.
    "no-console": "warn",
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/consistent-type-definitions": "off",

    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "@typescript-eslint/no-unsafe-argument": "warn",
    //no explicit any
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unsafe-assignment": "warn",
    "@typescript-eslint/no-unsafe-member-access": "warn",
    "@typescript-eslint/no-unsafe-call": "warn",
    "@typescript-eslint/no-unsafe-return": "warn",
    // "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],

    "import/no-duplicates": "warn",

    "sort-imports": ["warn", { ignoreCase: true, ignoreDeclarationSort: true }],

    "import/order": [
      "warn",
      {
        "newlines-between": "always",

        groups: [
          "builtin",
          "external",
          "internal",
          "index",
          "sibling",
          "parent",
          "object",
          "type",
        ],

        alphabetize: {
          order: "asc",

          caseInsensitive: true,
        },
      },
    ],
    "import/newline-after-import": "warn",

    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "warn",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],

    "react/no-unescaped-entities": "off",
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: false,
      },
    ],
    "react-server-components/use-client": "error",
    "@dword-design/import-alias/prefer-alias": [
      "warn",
      {
        alias: {
          "~": "./src/",
        },
      },
    ],
  },
};

module.exports = config;
