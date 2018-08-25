const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const merge = require('webpack-merge');

const publicPath = '/';
const title = 'Sports Store';

const parts = {
  base: {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'index.js',
      publicPath,
    },
    resolve: {
      modules: ['node_modules', './src'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title,
        inject: true,
        favicon: './src/favicon.png',
        template: './src/index.ejs',
      }),
      new ManifestPlugin({
        fileName: 'asset-manifest.json',
      }),
      new WebpackPwaManifest({
        inject: true,
        name: title,
        short_name: title,
        description: title,
        background_color: '#ffffff',
        theme_color: '#000000',
        start_url: './index.html',
        display: 'standalone',
        icons: [
          {
            src: path.resolve('src/favicon.png'),
            size: 192,
          },
        ],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: ['babel-loader'],
          exclude: /node_modules/,
        },
        {
          test: /\.(eot|otf|svg|ttf|woff|png)$/,
          use: {
            loader: 'file-loader',
            options: { name: 'assets/[name][hash].[ext]' },
          },
        },
      ],
    },
    devtool: 'source-map',
    node: {
      dgram: 'empty',
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty',
    },
  },

  development: {
    mode: 'development',
    devtool: 'cheap-module-source-map',
    devServer: {
      contentBase: false,
      historyApiFallback: true,
      host: '0.0.0.0',
      port: 3000,
    },
  },

  production: {
    mode: 'production',
    plugins: [
      new HtmlWebpackPlugin({
        title,
        inject: true,
        favicon: './src/favicon.png',
        template: './src/index.ejs',
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      }),
    ],
  },
};

module.exports = merge(parts.base, parts[process.env.NODE_ENV]);
