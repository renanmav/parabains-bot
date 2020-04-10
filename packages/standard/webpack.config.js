const path = require('path')

const webpack = require('webpack')

module.exports = {
  mode: 'production',
  entry: ['./src/index.ts'],
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
}
