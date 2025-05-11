import js from "@eslint/js"
import globals from "globals"
import tseslint from "typescript-eslint"
import { defineConfig } from "eslint/config"


export default defineConfig([
    { files: ["**/*.{js,mjs,cjs,ts}"], plugins: { js }, extends: ["js/recommended"] },
    { files: ["**/*.{js,mjs,cjs,ts}"], languageOptions: { globals: globals.browser } },
    tseslint.configs.recommended,
    {
        rules: {
            "indent": [
                "error",
                4
            ],
            "@typescript-eslint/no-unused-vars": "error",
            "object-curly-spacing": ["error", "always"],
            "array-bracket-spacing": ["error", "never"],
            "no-multi-spaces": "error",
            "no-mixed-spaces-and-tabs": "off",
            "linebreak-style": [
                "error",
                "unix"
            ],
            "quotes": [
                "error",
                "double"
            ],
            "semi": [
                "error",
                "never"
            ],
        },
    },
])
