const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const nodeExternals = require('webpack-node-externals')
const { VueLoaderPlugin } = require('vue-loader')
const Components = require('../components.json')

module.exports = {
  mode: 'production',
  devtool: 'none',
  entry: Components,
  output: {
    path: path.resolve(process.cwd(), './lib'),
    publicPath: '/dist/',
    filename: '[name]/index.js',
    chunkFilename: '[id].js',
    libraryTarget: 'commonjs2'
  },
  externals: [
    {
      vue: 'vue'
    },
    nodeExternals()
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false
          }
        }
      },
      {
        test: /\.(js)x?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(less|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          'postcss-loader',
          'less-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css'
    }),
    new VueLoaderPlugin(),
  ],
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({})
    ]
  }
}
