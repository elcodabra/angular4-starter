const path = require('path');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const { NamedModulesPlugin } = require('webpack');
const { CommonsChunkPlugin } = require('webpack').optimize;

const nodeModules = path.resolve(__dirname, '../node_modules');
const genDirNodeModules = path.resolve(__dirname, '../src', '../$$_gendir', '../node_modules');
const entryPoints = ['inline','polyfills','sw-register','styles','vendor','main'];

module.exports = {
  entry: {
    polyfills: [
      './src/polyfills.ts'
    ],
    styles: [
      './src/styles.css',
      './src/assets/css/fonts.css',
    ]
  },

  resolve: {
    extensions: ['.ts','.js'],
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: '@ngtools/webpack'
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        use: 'file-loader?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.css$/,
        exclude: [
          path.resolve(__dirname, '../src/app')
        ],
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: {
            loader: 'css-loader',
            options: {
              sourceMap: false
            }
          }
        })
      },
      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, '../src/app')
        ],
        use: [
          'to-string-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: false
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: 'src/assets/public',
      to: './public'
    }]),
    new ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
      hash: false,
      inject: true,
      compile: true,
      favicon: './src/favicon.ico',
      minify: {
        removeAttributeQuotes: true
      },
      cache: true,
      showErrors: true,
      chunks: 'all',
      excludeChunks: [],
      xhtml: true,
      chunksSortMode: function sort(left, right) {
        let leftIndex = entryPoints.indexOf(left.names[0]);
        let rightindex = entryPoints.indexOf(right.names[0]);
        if (leftIndex > rightindex) {
            return 1;
        }
        else if (leftIndex < rightindex) {
            return -1;
        }
        else {
            return 0;
        }
    }
    }),
    new CommonsChunkPlugin({
      name: [
        'inline'
      ],
      minChunks: null
    }),
    new CommonsChunkPlugin({
      name: [
        'vendor'
      ],
      minChunks: (module) => module.resource &&
                (module.resource.startsWith(nodeModules) || module.resource.startsWith(genDirNodeModules)),
      chunks: [
        'main'
      ]
    }),
    new NamedModulesPlugin({}),
  ],
  node: {
    fs: 'empty',
    global: true,
    crypto: 'empty',
    tls: 'empty',
    net: 'empty',
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false
  },
};
