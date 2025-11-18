import js from "@eslint/js";
import * as nextPluginPackage from "@next/eslint-plugin-next";
import globals from "globals";
import tseslint from "typescript-eslint";

const nextPlugin = nextPluginPackage.default ?? nextPluginPackage;
const nextFlatConfig = nextPluginPackage.flatConfig ?? {};

const normalizeNextFlatConfig = (config) => {
  if (!config) {
    return null;
  }

  if (Array.isArray(config.plugins)) {
    const normalizedPlugins = config.plugins.reduce((acc, pluginName) => {
      if (pluginName === "@next/next") {
        acc[pluginName] = nextPlugin;
      }
      return acc;
    }, {});

    return {
      ...config,
      plugins: normalizedPlugins,
    };
  }

  return config;
};

const nextCoreWebVitalsConfig =
  normalizeNextFlatConfig(nextFlatConfig.coreWebVitals) ?? {
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {},
  };

const typeAwareConfigs = tseslint.configs.recommended.map((config) => ({
  ...config,
  files: ["**/*.{ts,tsx}"],
}));

export default [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "dist/**",
      "build/**",
      ".velite/**",
      "example/**",
    ],
  },
  js.configs.recommended,
  ...typeAwareConfigs,
  nextCoreWebVitalsConfig,
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
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      ...nextCoreWebVitalsConfig.rules,
      "no-console": "off",
      "no-debugger": "error",
      "prefer-const": "error",
      "no-unused-vars": "off",
      "no-empty": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];
