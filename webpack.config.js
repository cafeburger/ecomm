var path = require('path');
var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('shared.js');

module.exports = {
  debug: true,
  context: path.resolve('js'),
  entry: {
    about: './about_page.js',
    home: './home_page.js',
    contact: './contact_page.js'

  },
  output: {
    path: path.resolve('build/js/'),
    publicPath: '/public/assets/js/',
    filename: "[name].js"
  },
  plugins: [commonsPlugin],
  devServer: {
    contentBase: 'public'
  },
  watch: false,
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: '/node-modules',
        loader: 'jshint-loader'
      }
    ],
    loaders: [
      {
        test: /\.es6/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['','.js', '.es6']
  }

}