const { merge } = require('webpack-merge')

const baseConfig = require('./webpack.base.config')

module.exports = merge(baseConfig, {
  mode: 'development',

  devtool: 'source-map',

  devServer: {
    hot: true,
    port: 3000,
    open: true
  },

  watchOptions: {
    ignored: /node_modules\/*/,
  }
})
