process.env.NODE_ENV = 'production';
process.env.BABEL_ENV = 'production';
process.env.ASSET_PATH = '/';

let webpack = require('webpack');
const config = require("./../webpack.custom.config")
let packageJson = require("../package.json")

webpack(config, function (err) {
  if (err) { throw err };
  console.log('Build complete!');
}); 
