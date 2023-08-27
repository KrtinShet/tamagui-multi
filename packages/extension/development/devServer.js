process.env.NODE_ENV = 'development';
process.env.ASSET_PATH = '/';
process.env.BABEL_ENV = 'development';

const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const config = require('../webpack.config'); 
const path = require('path');
const serverPort = require("./serverPort");


const port = serverPort.getDevServerPort();
/**
 * ADD HOT RELOAD FOR DEV
 */
const options = config.chromeExtensionBoilerplate || {};
const excludeEntriesToHotReload = options.notHotReload || [];

for (const entryName in config.entry) {
    if (excludeEntriesToHotReload.indexOf(entryName) === -1) {
        config.entry[entryName] = [
            'webpack/hot/dev-server',
            `webpack-dev-server/client?hot=true&hostname=localhost&port=${port}`,
        ].concat(config.entry[entryName]);
    }
}

config.plugins = [new webpack.HotModuleReplacementPlugin()].concat(
    config.plugins || []
);

delete config.chromeExtensionBoilerplate;

let compiler = webpack(config);

const server = new WebpackDevServer({
    compress: true,
    https: false,
    hot: false,
    liveReload: false,
    client: false,
    // webSocketServer: 'sockjs',
    host: 'localhost',
    port,
    static: {
        directory: path.join(__dirname, '../build'),
    },
    devMiddleware: {
        publicPath: `http://localhost:${port}/`,
        writeToDisk: true,
    },
    headers: { 'Access-Control-Allow-Origin': '*' },
    allowedHosts: 'all',
}, compiler);

if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept();
}

(async () => {
    await server.start();
    console.log(`Server listening on port ${port}`);
})()