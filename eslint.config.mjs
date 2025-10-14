import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import globals from "globals";

export default [
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      // Production-ready rules
      "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
      "no-debugger": "error",
      "no-unused-vars": "error",
      "prefer-const": "error",
      // Next.js rules (Core Web Vitals subset)
      "@next/next/no-img-element": "warn",
      "@next/next/no-html-link-for-pages": "error",
    },
  },
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "dist/**",
      "build/**",
    ],
  },
];
