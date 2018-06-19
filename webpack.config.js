const webpack = require('webpack'),
      merge = require('webpack-merge'),
      common = require('./webpack.common.config.js'),
      path = require('path');

module.exports = merge(common, {
  mode: 'development',
  devtool: "cheap-module-eval-source-map",
  module: {
    rules: [
      {test: /\.s[ac]ss$/,
        exclude: /node_modules/,
        use: [{ loader: 'style-loader', options: { sourceMap: true } },
              { loader: 'css-loader', options: { sourceMap: true } },
              { loader: 'postcss-loader', options: { sourceMap: true, plugins: () => {return [require('autoprefixer')]} } },
              { loader: 'sass-loader', options: { sourceMap: true } }]
      }
    ]
  },
  devServer: {
    historyApiFallback: {
      contentBase: path.join(__dirname, "dist")
    }
  }
});
