const { resolve } = require("./tools");
const config = {
    buildDetail: true,
    devServer: {
        static: {
            directory: resolve("dist"),
            serveIndex: true,
        },
        client: {
            overlay: {
                errors: true,
                warnings: false,
            },
        },
        host: "0.0.0.0",
        port: 2233,
        open: true,
        hot: false,
        historyApiFallback: { rewrites: [] },
        proxy: {
            "/xxx": {
                target: "http://xxx.com",
                changeOrigin: true,
                pathRewrite: {
                    "^/xxx": "/",
                },
            },
        },
    },
};

module.exports = config;
