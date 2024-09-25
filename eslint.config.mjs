import globals from "globals"
import pluginJs from "@eslint/js"

export default [
  { ignores: ["dist/**"] },
  { files: ["src/**/*.{js,mjs,cjs,ts}"] },
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: globals.browser } },
  {
    extends: [
      "plugin:@eslint/js/recommended",
      "plugin:@typescript-eslint/recommended",
      "prettier/@typescript-eslint",
    ],
  },
]
