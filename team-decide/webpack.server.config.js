const path = require('path');
const baseConfig = require('./webpack.base.config');

const config = {
  ...baseConfig,
  entry: path.join(__dirname, 'src/entry-server.js'),
  target: 'node',
  output: {
    filename: 'server.js',
    path: path.join(__dirname, 'dist')
  },
};

module.exports = (env, argv) => {
  switch (argv.mode) {
    case 'production':
      // expand config for production
      break;
    case 'development':
    default:
      // expand config for development
      config.devtool = 'inline-source-map';
      break;
  }

  return config;
};

