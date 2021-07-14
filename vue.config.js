const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
let webpack = require('webpack');
module.exports = {
    configureWebpack: {
        plugins: [
            new MonacoWebpackPlugin(),
            new webpack.ProvidePlugin({
                jQuery: 'jquery',
                $: 'jquery',
            })
        ]
    }
};