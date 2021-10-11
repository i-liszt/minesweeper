const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

const production = process.env.NODE_ENV === 'production'

module.exports = {
  entry: {
    app: [
      './src/app.tsx'
    ]
  },

  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: 'js/[name].[contenthash].js',
    chunkFilename: 'js/[name].[chunkhash].js'
  },

  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          production ? MiniCssExtractPlugin.loader : 'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: { localIdentName: '[local]__[hash:base64:5]' },
              sourceMap: false
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  [
                    'autoprefixer',
                  ],
                ]
              }
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: ['../src', '../scss']
              }
            }
          }
        ]
      },
      {
        test: /\.(t|j)sx?$/,
        include: /src\/*/,
        use: ['babel-loader']
      },
      {
        test: /\.(png|jpe?g|gif|svgz?|ttf|eot|woff2?)(\?.*)?$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'img/[hash].[ext]'
            }
          },
        ],
        type: 'javascript/auto'
      }
    ]
  },

  resolve: {
    alias: {
      '~': path.resolve(__dirname, '..', 'src'),
      scss: path.resolve(__dirname, '..', 'scss'),
      assets: path.resolve(__dirname, '..', 'assets')
    },
    plugins: [new TsconfigPathsPlugin({
      extensions: ['.js', '.jsx', '.json', '.ts', '.tsx']
    })],
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Minesweeper',
      template: './index.html'
    })
  ]
}