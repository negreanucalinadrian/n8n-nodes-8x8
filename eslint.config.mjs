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
            'no-empty': ['error', { allowEmptyCatch: true }], // allow empty catch blocks generally
            '@typescript-eslint/no-unused-vars': ['error', {
                vars: 'all',
                args: 'after-used',
                ignoreRestSiblings: true,
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
                caughtErrors: 'all',
                caughtErrorsIgnorePattern: '^_',
            }],
        },
    },
    {
        files: ["**/*.{js,mjs,cjs,ts}"],
        languageOptions: {globals: globals.browser},
    },
    tseslint.configs.recommended,
]);
