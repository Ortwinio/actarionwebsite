import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    rules: {
      // Production-ready rules
      "no-console": process.env.NODE_ENV === "production" ? "error" : "warn",
      "no-debugger": "error",
      "no-unused-vars": "error",
      "prefer-const": "error",
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

export default eslintConfig;
