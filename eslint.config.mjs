import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: [
      "**/.next/**",
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "next-env.d.ts",
    ],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    plugins: {
      import: (await import("eslint-plugin-import")).default,
      "simple-import-sort": (await import("eslint-plugin-simple-import-sort"))
        .default,
      prettier: (await import("eslint-plugin-prettier")).default,
    },
    rules: {
      // Import sorting
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",

      // Import hygiene and de-duplication
      "no-duplicate-imports": "error",
      "import/no-duplicates": ["error", { "prefer-inline": true }],
      "import/first": "error",
      "import/newline-after-import": ["error", { count: 1 }],
      "import/no-useless-path-segments": ["error", { noUselessIndex: true }],

      // Prettier integration
      "prettier/prettier": "error",

      // Ban all console usage
      "no-console": "error",
    },
  },
];

export default eslintConfig;
