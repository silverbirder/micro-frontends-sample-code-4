var webpack = require('webpack')

module.exports = {
  entry: './src/types.ts',
  output: {
    path: __dirname + '/public',
    filename: 'bundle.js'
  },
  resolve: {
    extensions: [ '.ts', '.js' ],
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  }
}
