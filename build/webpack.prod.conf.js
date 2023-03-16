const chalk = require("chalk");
const { merge } = require("webpack-merge");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const TerserPlugin = require("terser-webpack-plugin");
const ProgressBarPlugin = require("progress-bar-webpack-plugin");
const BundleDeclarationsWebpackPlugin = require("bundle-declarations-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const config = require('./config');
const baseConfig = require("./webpack.base.conf");

const prodConfig = {
    externals: {
        three: "THREE",
        
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    parse: {},
                    format: {
                        comments: false,
                        ascii_only: true,
                    },
                    compress: {
                        passes: 1,
                        drop_console: true,
                        drop_debugger: true,
                        reduce_vars: true,
                        inline: true,
                    },
                },
                parallel: true,
            }),
        ],
    },
    performance: {
        maxEntrypointSize: 5120000,
        maxAssetSize: 5120000,
    },
    plugins: [
        new BundleDeclarationsWebpackPlugin.default({
            entry: "./src/index.ts",
            outFile: "index.d.ts",
        }),
        // new HtmlWebpackPlugin({
        //     template: "./src/index.html",
        //     filename: "index.html",
        // }),
        new ProgressBarPlugin({
            format: "  build [:bar] " + chalk.green.bold(":percent") + " (:elapsed seconds)",
        }),
    ],
};
if (config.buildDetail) {
    prodConfig.plugins.push(
        new BundleAnalyzerPlugin({
            analyzerPort: 8899,
        })
    );
}
module.exports = merge(baseConfig, prodConfig);
