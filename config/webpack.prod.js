const path = require('path');
const webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const { DefinePlugin, LoaderOptionsPlugin, NoEmitOnErrorsPlugin } = require('webpack');
const { UglifyJsPlugin } = require('webpack').optimize;
const { AotPlugin } = require('@ngtools/webpack');
const commonConfig = require('./webpack.common.js');

const ENV = process.env.NODE_ENV = process.env.ENV = 'production';

module.exports = webpackMerge(commonConfig, {
  devtool: 'eval',

  entry: {
    main: [
      './src/main.ts'
    ],
  },

  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[hash].js',
    chunkFilename: '[id].[hash].chunk.js'
  },

  plugins: [
    new NoEmitOnErrorsPlugin(),
    new UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
      sourceMap: false,
      mangle: {
        keep_fnames: true
      },
      compress: {
        warnings: false
      },
      output: {
        comments: false
      },
    }),
    new ExtractTextPlugin('[name].[hash].css'),
    new DefinePlugin({
      'process.env': {
        'ENV': JSON.stringify(ENV),
        'NODE_ENV': JSON.stringify(ENV)
      }
    }),
    new LoaderOptionsPlugin({
      htmlLoader: {
        minimize: false
      }
    }),
    new AotPlugin({
      mainPath: 'main.ts',
      hostReplacementPaths: {
        'environments/environment.ts': 'environments/environment.prod.ts'
      },
      exclude: [],
      tsConfigPath: 'src/tsconfig.app.json',
      skipCodeGeneration: false
    })
  ],
  devServer: {
    historyApiFallback: true
  }
});
