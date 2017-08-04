  const path = require('path');
  const CleanWebpackPlugin = require('clean-webpack-plugin');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const webpack = require('webpack');

 module.exports = {
  entry: {
      app: './src/index.js',
      // list:  './src/todolistitem.js'
    },
    devtool: 'inline-source-map',
     devServer: {
    contentBase: './'
   },
    module: {
    rules: [
     {
       test: /\.tsx?$/,
       use: 'ts-loader',
       exclude: /node_modules/
     }
   ]
 },
 resolve: {
   extensions: [".tsx", ".ts", ".js"]
 },
 
      plugins: [
      // new CleanWebpackPlugin(['dist']),
      new HtmlWebpackPlugin({
      title: 'TodoList',
      template: './index.html',
    }),
       new webpack.optimize.CommonsChunkPlugin({
      children: true,
      async: true,
    }),
    ],
  output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
};

