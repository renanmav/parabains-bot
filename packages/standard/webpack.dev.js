const path = require('path')

const webpack = require('webpack')
const merge = require('webpack-merge')
const ReloadServerPlugin = require('reload-server-webpack-plugin')

const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  entry: ['./src/index.ts'],
  watch: true,
  plugins: [
    new ReloadServerPlugin({
      script: path.resolve('dist', 'main.js'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),
  ],
})
