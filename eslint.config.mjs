import eslint from "@eslint/js";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import tseslint from "typescript-eslint";

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  prettierRecommended,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
    },
  },
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "src/routes.ts",
      "src/docs/swagger.json",
    ],
  },
];
