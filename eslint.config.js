import { defineConfig } from "@eslint/config-helpers";
import js from "@eslint/js";

export default defineConfig([
    {
        files: ["src/**/*.js"],
        plugins: { js },
        extends: ["js/recommended"],
        rules: {
            semi: "error",
            "prefer-const": "error",
        },
    },
    {
        files: ["test/**/*.js"],
        rules: {
            "no-console": "off",
        },
    },
]);