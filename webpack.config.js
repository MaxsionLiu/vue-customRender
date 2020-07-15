const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
   entry: path.resolve(__dirname,"./index.js"),
   output: {
       publicPath: './',
       filename: 'main.js',
       path: path.resolve(__dirname, './dist'),
   },
   plugins:[new htmlWebpackPlugin()],

}