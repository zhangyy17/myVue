var path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const distPath = path.resolve(__dirname, 'dist');
const srcPath = path.resolve(__dirname, 'src');
const componentPath = path.resolve(__dirname, 'src/components');

module.exports = {
  entry: {
    uui: './src/index.js'
  },
  resolve: {
    extensions: ['.js', '.vue'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': srcPath,
      $: componentPath
    }
  },
  plugins: [
    new CleanWebpackPlugin(['dist', 'public']),
    new ExtractTextPlugin('style.css')
  ],
  output: {
    path: distPath,
    filename: '[name].js',
    library: 'UUI',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
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
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
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
      }
    ]
  }
};
