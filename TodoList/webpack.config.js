 const path = require('path');
  const CleanWebpackPlugin = require('clean-webpack-plugin');

 module.exports = {
  entry: {
      app: './src/index.ts',
    },
    devtool: 'inline-source-map',
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

    //   plugins: [
    //   new CleanWebpackPlugin(['dist']),
    // ],
  output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
};

