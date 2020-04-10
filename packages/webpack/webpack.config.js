const webpack = require('webpack')

module.exports = {
  target: 'node',
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
  output: {
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
