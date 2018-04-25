// webpack配置文件
var path = require('path'); // node自带的文件路径插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const distPath = path.resolve(__dirname, 'dist');// 打包目录
const srcPath = path.resolve(__dirname, 'src');// src目录
const componentPath = path.resolve(__dirname, 'src/components');// 组件目录

module.exports = {
  entry: {
    app: './src/main.js'// 入口
  },
  resolve: {// webpack内置选项，决定要做的事情，比如说import "jQuery"该如何执行就是resolve要做的
    extensions: ['.js', '.vue'],// 找js，vue文件
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': srcPath,// 用@代替srcPath
      $: componentPath// 用$代替componentPath
    }
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: 'index.html',
      inject: 'body',
      minify: {
        removeComments: true
      }
    }),
    new ExtractTextPlugin('style.css')
  ],
  output: {
    path: distPath,
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,// 处理vue文件
        exclude: /node_modules/,
        loader: 'vue-loader',
        options: {
          loaders: {
            css: ExtractTextPlugin.extract({
              use: 'css-loader',
              fallback: 'vue-style-loader'
            }),
            scss: ExtractTextPlugin.extract({
              use: ['css-loader', 'postcss-loader'],
              fallback: 'vue-style-loader'
            })
          },
          cssModules: {
            localIdentName: '[name]-[local]-[hash:base64:5]',
            camelCase: true
          }
        }
      },
      {
        test: /\.js$/,// 处理js文件将es6转为es5
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: ['css-loader', 'postcss-loader'],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        exclude: /node_modules/,
        use: ['file-loader']
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        exclude: /node_modules/,
        use: ['file-loader']
      },
      {
        test: /\.vue$/,
        enforce: 'pre', // 在babel-loader对源码进行编译前进行lint的检查
        include: /src/, // src文件夹下的文件需要被lint
        use: [
          {
            loader: 'eslint-loader',
            options: {
              formatter: require('eslint-friendly-formatter') // 编译后错误报告格式
            }
          }
        ]
        // exclude: /node_modules/ 可以不用定义这个字段的属性值，eslint会自动忽略node_modules和bower_
      }
    ]
  }
};
