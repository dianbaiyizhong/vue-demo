const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
let webpack = require('webpack');
module.exports = {
    // devServer: {
    //     open: true,
    //     host: 'localhost',
    //     port: 8080,
    //     https: false,
    //     proxy: {
    //         '/api': {
    //             target: 'http://localhost:8080',
    //             pathRewrite: {
    //                 '^/api': '/mock'
    //             }
    //         }
    //     }
    // },
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