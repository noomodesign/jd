const { merge } = require('webpack-merge');
const path = require('path');

const config = require('./webpack.config');

module.exports = merge(config, {
  mode: 'development',

  devtool: 'inline-cheap-source-map',

  watchOptions: {
    ignored: ['**/node_modules/', '**/src/views/_data/assets.json'],
  },

  devServer: {
    webSocketServer: false,
    compress: true,
    server: {
      type: 'spdy',
    },
    // proxy: {
    //   '/api': 'http://localhost:3000',
    // },
    host: process.env.HOST,
    port: process.env.PORT,
    hot: 'only',
    liveReload: true,
    static: {
      directory: path.join(__dirname, 'dist'),
      watch: true,
    },
    client: {
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    devMiddleware: {
      writeToDisk: true,
      index: true,
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    },
  },
});
