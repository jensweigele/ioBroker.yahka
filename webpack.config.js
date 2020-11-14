const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpack = require('webpack');

let backendConfig = {
  context: path.resolve(__dirname, 'src'),
  target: "node",
  mode: "development",
  entry: {
    "main": "./main.ts"
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
  devtool: "source-map",
  externals: [nodeExternals()],
  output: {
    path: path.resolve(__dirname)
  }
};

let frontendConfig = {
  context: path.resolve(__dirname, 'src'),
  target: "web",
  mode: "development",
  entry: {
    "yahka.admin": "./admin/yahka.admin.ts"
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
    extensions: ['.tsx', '.ts', '.js']
  },
  devtool: "source-map",
  externals: {
    jquery: 'jQuery'
  },
  output: {
    library: "yahkaAdmin",
    libraryTarget: "var",
    path: path.resolve(__dirname, "admin/")
  },
  node: {
    dgram: 'empty',
    child_process: 'empty',
    fs: 'empty',
    net: 'empty'
  },
  plugins: [
    new webpack.NormalModuleReplacementPlugin(
      /lib\/AccessoryLoader\.js/,
      path.resolve(__dirname, 'src/AccessoryLoaderForBrowser.js')
    )
  ]
};

module.exports = [backendConfig, frontendConfig];