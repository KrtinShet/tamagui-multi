process.env.NODE_ENV = 'production';
process.env.BABEL_ENV = 'production';
process.env.ASSET_PATH = '/';



let webpack = require('webpack');
let AdmZip = require('adm-zip');
let path = require('path');
let config = require('../webpack.config');
let env = require('./env');
let packageJson = require("../package.json")

delete config.chromeExtensionBoilerplate;
let browser = env.EXT_PLATFORM;
config.mode = 'production';

webpack(config, function (err) {
    if (err) { throw err };
    let zip = new AdmZip();
    let inPath = path.join(__dirname, '..', 'build', browser) // folder to zip
    let outPath = path.join(__dirname, '..', `${browser}-V${packageJson.version}.zip`) // name of output zip file 
    zip.addLocalFolder(inPath);
    zip.writeZip(outPath);

    console.log('Build complete!');
}); 
