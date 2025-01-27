const path = require('path');
const webpack = require('webpack');
const SystemJSPublicPathWebpackPlugin = require("systemjs-webpack-interop/SystemJSPublicPathWebpackPlugin");

module.exports = {
  devtool: "source-map",
  mode: 'development',
  entry: path.resolve(__dirname, './src/index.js'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        parser: {
          system: false,
        },
      }
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  externals: ['react', 'react-dom'],
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'bundle.js',
    libraryTarget: "system",
    publicPath: '/',
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new SystemJSPublicPathWebpackPlugin({}),
  ],
  devServer: {
    static: path.join(__dirname, './public'),
    hot: true,
    host: 'localhost',
    port: 3000,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods':
        'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization',
    }
  },
};
