const path = require('path');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { AotPlugin } = require('@ngtools/webpack');
const commonConfig = require('./webpack.common.js');
const proxyConf = require('../proxy.conf.json');

module.exports = webpackMerge(commonConfig, {
  devtool: 'cheap-module-eval-source-map',

  entry: {
    main: [
      './src/main.ts'
    ]
  },

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },

  plugins: [
    new ExtractTextPlugin('[name].css'),
    new AotPlugin({
      mainPath: 'main.ts',
      hostReplacementPaths: {
        'environments/environment.ts': 'environments/environment.local.ts'
      },
      exclude: [],
      tsConfigPath: 'src/tsconfig.app.json',
      skipCodeGeneration: true
    })
  ],

  devServer: {
    historyApiFallback: true,
    stats: 'minimal',
    proxy: proxyConf
  }
});
