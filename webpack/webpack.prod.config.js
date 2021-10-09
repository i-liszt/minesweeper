const webpack = require('webpack')
const { merge } = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const baseConfig = require('./webpack.base.config')

module.exports = merge(baseConfig, {
  output: {
    clean: true
  },

  mode: 'production',

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash].css',
      chunkFilename: 'css/[name].[chunkhash].css'
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ],

  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom|react-router)[\\/]/,
          name: 'vendor.react'
        },
        normalize: {
          test: /[\\/]node_modules[\\/](normalize\.css)[\\/]/,
          name: 'vendor.normalize',
          enforce: true,
          priority: 100,
        }
      }
    }
  }
})
