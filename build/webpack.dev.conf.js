const { HotModuleReplacementPlugin } = require('webpack');
const { merge } = require('webpack-merge');
const { devServer } = require('./config');
const { getEntries } = require('./tools');
const { resolve } = require('./tools');
const baseConfig = require('./webpack.base.conf');
const ESLintPlugin = require('eslint-webpack-plugin');

const { entries, htmlPlugins } = getEntries();

module.exports = (env) => {
    devServer.historyApiFallback.rewrites = [{ from: /./, to: `/demo/${Object.keys(env)[1]}/` }];

    const devConfig = {
    entry: {
        ...entries,
    },
    plugins: [new HotModuleReplacementPlugin(), ...htmlPlugins, new ESLintPlugin({
                        extensions: ['js', 'jsx', 'ts', 'tsx'],
                        formatter: require('eslint-friendly-formatter'),
                    })],
    devServer: devServer,
    cache: true,
};

    return merge(baseConfig, devConfig);
}
