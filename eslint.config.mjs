import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  {
    rules: {
      eqeqeq: "error",
      curly: ["error", "all"],
      "no-var": "error",
      "prefer-const": "error",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      // Let TypeScript handle unused vars for better accuracy
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" }
      ],
      // Prefer `import type { X } from '...'`
      "@typescript-eslint/consistent-type-imports": [
        "error",
        { prefer: "type-imports", disallowTypeAnnotations: false }
      ],
      // Not needed in React 17+ / Next.js
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
    },
  },
];

export default eslintConfig;
