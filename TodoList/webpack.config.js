 const path = require('path');
  const CleanWebpackPlugin = require('clean-webpack-plugin');

  module.exports = {
    entry: {
      app: './src/index.js',
    },

     devtool: 'inline-source-map',
     devServer: {
        contentBase: './'
  }, 
  
    // plugins: [
    //   new CleanWebpackPlugin(['dist']),
    // ],
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }

  };