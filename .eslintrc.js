module.exports = {
    root: true,
    extends: [],
    globals: {},
    env: {
        browser: true,
    },
    parserOptions: {},
    // For ts file
    overrides: [
        {
            files: ["*.ts", "*.tsx"],
            settings: {
                // 'import/resolver': {
                //   alias: {
                //     extensions: ['.ts', '.tsx'],
                //   },
                // },
            },
            extends: ["airbnb-base", "airbnb-typescript/base"],
            parserOptions: {
                ecmaVersion: 12,
                sourceType: "module",
                parser: "@typescript-eslint/parser",
                project: ["./tsconfig.json"],
            },
            rules: {
                "no-console": ["warn", { allow: ["warn", "error", "info"] }],
                "no-debugger": "warn",
                "no-unused-vars": "warn",
                "@typescript-eslint/no-unused-vars": "warn",
                "@typescript-eslint/no-non-null-assertion": "warn",
                "no-param-reassign": ["warn", { props: false }],
                "@typescript-eslint/lines-between-class-members": "warn",
                "no-plusplus": "off",
                "class-methods-use-this": "warn",
                "padded-blocks": ["warn", "always"],
                quotes: ["warn", "single"],
                "max-len": ["warn", 500],
                indent: "off",
                "no-mixed-operators": "off",
                "@typescript-eslint/type-annotation-spacing": "error",
                "@typescript-eslint/indent": ["warn", 4],
            },
            plugins: ["@typescript-eslint", "prettier"],
        },
    ],
};
