  const path = require('path');
  const CleanWebpackPlugin = require('clean-webpack-plugin');
  const HtmlWebpackPlugin = require('html-webpack-plugin');
  const webpack = require('webpack');

 module.exports = {
  entry: {
      app: './src/index.ts',
      list:  './src/todolistitem.ts'
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
    ],
  output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
};

