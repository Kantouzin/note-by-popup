const webpack = require('webpack');
const path = require('path');

module.exports = {
  mode: 'development',
  devtool: false,
  entry: {
    popup: path.join(__dirname, 'src', 'popup.js')
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [['@babel/preset-env', {
                modules: false,
                targets: {
                  node: 'current'
                }
              }]]
            }
          }
        ]
      }
    ]
  }
}
