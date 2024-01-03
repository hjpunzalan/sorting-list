module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true
  },
  parser: "@typescript-eslint/parser",
  extends: [
    // By extending from a plugin config, we can get recommended rules without having to add them manually.
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "plugin:jsx-a11y/recommended",
    "plugin:@typescript-eslint/recommended",
    // This disables the formatting rules in ESLint that Prettier is going to be responsible for handling.
    // Make sure it's always the last config, so it gets the chance to override other configs.
    "prettier"
  ],
  plugins: ["react", "react-hooks"],
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"]
    },
    // Tells eslint how to resolve imports
    "import/resolver": {
      node: {
        paths: ["src"],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        moduleDirectory: ["node_modules", "src/"]
      },
      typescript: {
        // use an array if multiple
        project: "tsconfig.json"
      }
    },
    react: {
      version: "detect"
    }
  },
  rules: {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "jest/no-mocks-import": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "jsx-a11y/alt-text": "off",
    "import/no-unresolved": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/display-name": "off",
    "@typescript-eslint/no-unused-vars": "warn"
  }
};
