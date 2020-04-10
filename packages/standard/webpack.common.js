const path = require('path')

const webpack = require('webpack')

const common = require('@parabains-bot/webpack')

module.exports = {
  ...common,
  output: {
    path: path.resolve(__dirname, 'dist'),
    ...common.output,
  },
}
