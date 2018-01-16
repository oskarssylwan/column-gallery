const webpack = require('webpack');

module.exports = {
  entry: './src/js/app.js',
  output: {
    path: __dirname + '/build',
    filename: 'app.min.js'
  }
}
