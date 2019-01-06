const path = require('path');
const nodeExternals = require('webpack-node-externals');
let backendConfig = {
  context: path.resolve(__dirname, 'src'),
  target: "node",
  mode: "development",
  entry: {
    "main": "./main.ts"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ],
    noParse: /lib\/utils/
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
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
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.inc.html$/,
        use: 'raw-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  externals: {
    jquery: 'jQuery'
  },
  output: {
    library: "yahkaAdmin",
    libraryTarget: "var",
    path: path.resolve(__dirname, "admin/")
  }
};



module.exports = [backendConfig, frontendConfig];