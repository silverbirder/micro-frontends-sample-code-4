const baseConfig = require('./webpack.base.config');
const path = require('path');

const config = { ...baseConfig };

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
  };
  config.resolve.alias = Object.assign({}, baseConfig.resolve.alias, {
    'create-api': path.join(__dirname, 'src/create-api-client.js')
  });
  return config;
};