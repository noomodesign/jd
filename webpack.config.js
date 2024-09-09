require('dotenv').config();

const path = require('path');
const webpack = require('webpack');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const WebpackAssetsManifest = require('webpack-assets-manifest');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const IS_DEVELOPMENT = process.env.NODE_ENV != 'production';

const srcFolder = path.join(__dirname, 'src');
const assets = path.join(srcFolder, 'assets');
const dirJs = path.join(assets, 'js');
const modules = 'node_modules';
const dirStyles = path.join(assets, 'styles');

const ENTRIES = {
  main: [path.join(dirJs, 'index.js'), path.join(dirStyles, 'index.scss')],
};

const STYLES = [];

STYLES.forEach((name) => {
  ENTRIES[name] = path.join(dirStyles, `${name}.scss`);
});

const setFileName = (ext = '.js', hashLength) => {
  const folder = ext.replace('.', '');
  const basePath = `assets/${folder}/[name]`;

  return IS_DEVELOPMENT ? `${basePath}${ext}` : `${basePath}.[contenthash:${hashLength}]${ext}`;
};

module.exports = {
  entry: ENTRIES,

  output: {
    filename: setFileName(),
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    module: true,
  },
  target: ['web', 'es2017'],
  experiments: {
    outputModule: true,
  },

  resolve: {
    modules: [assets, modules],
  },

  plugins: [
    new Dotenv({ systemvars: true }),
    new webpack.DefinePlugin({ IS_DEVELOPMENT }),

    new webpack.ProvidePlugin({}),

    new RemoveEmptyScriptsPlugin(),

    new MiniCssExtractPlugin({
      filename: setFileName('.css'),
    }),

    new StylelintPlugin({
      configFile: 'stylelint.config.js',
      context: 'src/assets/styles',
      failOnError: false,
    }),

    new ESLintPlugin({
      extensions: ['.js'],
      files: path.join(dirJs, '**/*.js'),
      fix: true,
    }),

    // new EnvironmentPlugin({
    //   DEFAULT_LOCALE: process.env.DEFAULT_LOCALE,
    //   SITE_DOMAIN: process.env.SITE_DOMAIN,
    //   CMS_DOMAIN: process.env.CMS_DOMAIN,
    //   CMS_ACCESS_TOKEN: process.env.CMS_ACCESS_TOKEN,
    //   PAGINATION_SIZE: process.env.PAGINATION_SIZE,
    // }),

    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: 'src/assets/pwa/offline.html',
    //       to: path.resolve(__dirname, 'dist/offline.html'),
    //     },
    //   ],
    // }),

    new WebpackAssetsManifest({
      output: path.resolve(__dirname, 'src/views/_data/assets.json'),
      writeToDisk: true,
      publicPath: '/',
    }),
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },

      {
        // here doing the swiper loader and declaring no sideEffects
        test: /swiper\.esm\.js/,
        sideEffects: false,
      },

      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },

      {
        test: /\.(sa|sc|c)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'group-css-media-queries-loader', 'sass-loader'],
      },

      {
        test: /\.(jpe?g|png|gif|svg|mp4|webp)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[hash][ext][query]',
        },
      },

      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[hash][ext][query]',
        },
      },

      {
        test: /\.(glsl|frag|vert)$/,
        use: ['asset/resource', 'glslify-loader'],
        exclude: /node_modules/,
        generator: {
          filename: 'assets/static/[hash][ext][query]',
        },
      },
    ],
  },
};
