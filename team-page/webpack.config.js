const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'fragment.js',
        path: path.resolve(__dirname, 'dist'),
    },
};