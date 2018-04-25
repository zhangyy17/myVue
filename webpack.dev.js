// 项目启动文件
var path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.config');

module.exports = merge(baseWebpackConfig, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    port: 8000,
    host: '127.0.0.1'
  }
});
