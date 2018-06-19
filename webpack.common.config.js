const webpack = require('webpack'),
      path = require('path'),
      env = process.env.NODE_ENV || 'development',
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      CleanWebpackPlugin = require('clean-webpack-plugin');

var Settings = require("./src/settings/settings." + env + ".json");
Settings.partners = require("./src/settings/settings.partners.json");
Settings.seo = require("./src/settings/settings.seo.json");

module.exports = {
  context: path.join(__dirname, "src"),
  entry: {
    app: "./js/app.js"
  },
  output: {
    filename: "[name].[hash].min.js",
    chunkFilename: '[name].[hash].min.js',
    path: path.join(__dirname, "dist"),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [{
          'loader': 'babel-loader',
          'options': {
            presets: ['env', 'react'],
            plugins: ['react-html-attrs','syntax-dynamic-import']
          }
        }]
      }
    ]
  },
  plugins:[
    new webpack.EnvironmentPlugin({
      DEBUG: false,
      VERSION: require("./package.json").version +
               " - " + new Date().toLocaleString()
    }),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      title: Settings.seo['home']['title'],
      description: Settings.seo['home']['description'] || '',
      keywords:  Settings.seo['home']['keywords'] || '',
      minify: (env!=='development' && env!=='qa')?{
        'collapseWhitespace': true,
        'minifyJS': true,
        'removeComments': true,
        'removeStyleLinkTypeAttributes': true
      }:false,
      inject: false,
      template: 'html/template.html',
      filename: 'index.html',
      gtmId: env==='production' ? 'GTM-KJL4P63' : null,
      hotjarId: env==='stage' ? '788027' : null,
      chat: env!=='development' && env!=='qa',
      typographyId: env==='development' ? '7339192' : '6402992'
    }),
  ],
  resolve: {
    modules: [path.join(__dirname, "src"), "node_modules"],
    'alias': {
      'website': path.resolve(__dirname, './src/js/website'),
      'marketplace': path.resolve(__dirname, './src/js/marketplace'),
      'dashboard': path.resolve(__dirname, './src/js/dashboard'),
      'login': path.resolve(__dirname, './src/js/login'),
      'admin': path.resolve(__dirname, './src/js/admin'),
      'stores': path.resolve(__dirname, './src/js/stores'),
      'actions': path.resolve(__dirname, './src/js/actions'),
      'shared': path.resolve(__dirname, './src/js/shared'),
      'helpers': path.resolve(__dirname, './src/js/shared/helpers'),
      'gaHelper': path.resolve(__dirname, './src/js/shared/gaHelper'),
      'constants': path.resolve(__dirname, './src/js/shared/constants')
    },
    'extensions': ['.js', '.jsx', '.sass', '.scss']
  },
  externals: {
    'Settings': JSON.stringify(Settings)
  }
};
