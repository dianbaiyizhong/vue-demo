let webpack = require('webpack');
var path = require('path')

module.exports = {
    lintOnSave: false,

    chainWebpack(config) {

        let dir = path.resolve(__dirname, 'src/components/G6Flow/G6Editor/Toolbar/icons')

        config.module
            .rule('svg')
            .exclude.add(dir)
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(dir)
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()


    },
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                jQuery: 'jquery',
                $: 'jquery',
            })
        ]
    }
};