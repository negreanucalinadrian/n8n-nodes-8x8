import {defineConfig} from "eslint/config";
import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
    {
        files: ["**/*.{js,mjs,cjs,ts}"],
        plugins: {js},
        extends: ["js/recommended"],
        rules: {
            "@typescript-eslint/ban-ts-comment": [
                "error",
                {
                    "ts-ignore": false // Allow @ts-ignore
                }
            ],
            "@typescript-eslint/no-explicit-any": ["off"],
            indent: ["error", 4],
        },
    },
    {
        files: ["**/*.{js,mjs,cjs,ts}"],
        languageOptions: {globals: globals.browser},
    },
    tseslint.configs.recommended,
]);
