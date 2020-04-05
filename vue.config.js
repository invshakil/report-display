
module.exports = {
    publicPath: '/',
    lintOnSave: false,
    transpileDependencies: [
        'vue-echarts',
        'resize-detector'
    ],
    configureWebpack: {
        optimization: {
            splitChunks: {
                chunks: 'all'
            }
        }
    },
    chainWebpack: config => config.resolve.symlinks(false)
}

