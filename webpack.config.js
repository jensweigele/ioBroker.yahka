const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

let backendConfig = {
  context: path.resolve(__dirname, 'src'),
  target: 'node',
  mode: 'development',
  entry: {
    'main': './main.ts'
  },
  module: {
    rules: [{
      test: /\.tsx?$/,
      use: 'ts-loader',
      exclude: /node_modules/
    }],
    noParse: /lib\/utils/
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  devtool: 'source-map',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname)
  }
};

const ReplaceInFileWebpackPlugin = require('replace-in-file-webpack-plugin');

let frontendConfig = {
  context: path.resolve(__dirname, 'src'),
  target: 'web',
  mode: 'development',
  entry: {
    'yahka.admin': './admin/yahka.admin.ts'
  },
  infrastructureLogging: {
    level: 'verbose',
  },
  module: {
    rules: [{
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.inc.html$/,
        use: [{
          loader: 'raw-loader',
          options: {
            esModule: false,
          },
        }]
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback: {
      'assert': false,
      'os': false,
      'dgram': false,
      'child_process': false,
      'fs': false,
      'net': false,
      'http': false,
      'path': require.resolve('path-browserify'),
      'crypto': require.resolve('crypto-browserify'),
      'stream': require.resolve('stream-browserify'),
      'buffer': require.resolve('buffer'),
      'url': false,
    }
  },
  devtool: 'source-map',
  externals: {
    jquery: 'jQuery',
    'node:fs': 'common node:fs'
  },
  output: {
    library: 'yahkaAdmin',
    libraryTarget: 'var',
    path: path.resolve(__dirname, 'admin/')
  },
  plugins: [
    new ReplaceInFileWebpackPlugin([
      {
        dir: 'admin',
        files: ['yahka.admin.js'],
        rules: [
          {
            search: /__webpack_require__\(\/\*! node:fs \*\/ "node:fs"\)/g,
            replace: 'null'
          },
          {
            search: /module\.exports = node:fs;/g,
            replace: ''
          },
          {
            search: 'const packageJson = JSON.parse((0, node_fs_1.readFileSync)(/*require.resolve*/(/*! ../../../package.json */ "../node_modules/hap-nodejs/package.json"), "utf-8"));',
            replace: 'const packageJson = __webpack_require__(/*! ../package.json */ "../node_modules/hap-nodejs/package.json");'
          },
          {
            search: 'const packageJson = JSON.parse((0, node_fs_1.readFileSync)(/*require.resolve*/(/*! ../package.json */ "../node_modules/hap-nodejs/package.json"), "utf-8"));',
            replace: 'const packageJson = __webpack_require__(/*! ../package.json */ "../node_modules/hap-nodejs/package.json");'
          }
        ]
      }
    ]),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new webpack.NormalModuleReplacementPlugin(
      /lib\/AccessoryLoader\.js/,
      path.resolve(__dirname, 'src/AccessoryLoaderForBrowser.js')
    ),
    new webpack.NormalModuleReplacementPlugin(
      /lib\/HAPServer\.js/,
      path.resolve(__dirname, 'src/AccessoryLoaderForBrowser.js')
    ),
    new webpack.NormalModuleReplacementPlugin(
      /lib\/util\/hapCrypto\.js/,
      path.resolve(__dirname, 'src/AccessoryLoaderForBrowser.js')
    ),
  ]
};

module.exports = [backendConfig, frontendConfig];
