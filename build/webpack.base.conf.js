const { resolve } = require("./tools");

const baseConfig = {
    target: "web",
    entry: {
        index: [resolve("src/index.ts")],
    },
    output: {
        filename: "[name].js",
        path: resolve(`dist`),
        library: {
            type: "umd",
        },
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        alias: {
            "@src": resolve("src"),
            three: resolve('./node_modules/three')
        },
        fallback: {
            fs: false,
            path: false,
            Buffer: false,
        },
    },
    stats: {
        children: true,
    },
    module: {
        rules: [
            {
                test: /\.([cm]?ts|tsx)$/,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            onlyCompileBundledFiles: true,
                        },
                    },
                ],
                include: [resolve("src"), resolve("demo")],
            },
        ],
    },
    mode: "development",
};

module.exports = baseConfig;
