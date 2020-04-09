const path = require('path')

const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  target: 'node',
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: 'index',
    libraryTarget: 'commonjs2',
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: process.env.NODE_ENV !== 'production',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.([tj]s)$/,
        loader: 'babel-loader',
        options: {
          configFile: './babel.config.js',
        },
        exclude: /node_modules/,
      },
    ],
  },
  externals: [
    nodeExternals({
      modulesFromFile: {
        exclude: ['devDependencies'],
      },
    }),
  ],
}
