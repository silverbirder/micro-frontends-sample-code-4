const path = require('path');
const VueSSRServerPlugin = require('vue-server-renderer/server-plugin');
const baseConfig = require('./webpack.base.config');

const config = {
  ...baseConfig,
  entry: path.join(__dirname, 'src/entry-server.js'),
  target: 'node',
  output: {
    ...baseConfig.output,
    libraryTarget: 'commonjs2'
  },
  plugins: [
    ...baseConfig.plugins,
    new VueSSRServerPlugin()
  ]
};

config.resolve.alias = Object.assign({}, baseConfig.resolve.alias, {
  'create-api': path.join(__dirname, 'src/create-api-server.js')
});

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

