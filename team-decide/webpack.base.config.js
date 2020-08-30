const path = require('path');

const config = {
  entry: path.join(__dirname, 'src/entry-client.jsx'),
  output: {
    filename: 'fragment.js',
    path: path.join(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            // babelの設定
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'usage',
                    corejs: 3,
                  },
                ],
                [
                  '@babel/preset-react',
                  {
                    useBuiltIns: 'usage',
                    corejs: 3,
                  },
                ],
              ],
            },
          },
        ],
      },
    ],
  }
};

module.exports = config;
