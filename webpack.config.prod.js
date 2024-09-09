const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const { merge } = require('webpack-merge');
const config = require('./webpack.config');
const path = require('path');

module.exports = merge(config, {
  mode: 'production',
  cache: {
    type: 'filesystem',
    cacheDirectory: path.resolve(__dirname, '.cache'),
  },
  experiments: {
    outputModule: true,
  },
  // optimization: {
  //   moduleIds: 'size',
  //   chunkIds: 'size',
  //   mangleExports: 'size',
  //   mangleWasmImports: true,
  //   runtimeChunk: 'single',
  //   // splitChunks: {
  //   //   minSize: 100000,
  //   //   cacheGroups: {
  //   //     vendors: {
  //   //       chunks: 'all',
  //   //       test: /[\\/]node_modules[\\/]/,
  //   //       name(module) {
  //   //         // get the name. E.g. node_modules/packageName/not/this/part.js
  //   //         // or node_modules/packageName
  //   //         const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

  //   //         // npm package names are URL-safe, but some servers don't like @ symbols
  //   //         return `vendor.${packageName.replace('@', '').replace('.js', '')}`;
  //   //       },
  //   //     },
  //   //   },
  //   // },
  // },
  // plugins: [new BundleAnalyzerPlugin()],
});
