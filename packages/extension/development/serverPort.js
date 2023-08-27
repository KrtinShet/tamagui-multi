const env = require('./env');
const portMapKey = env.EXT_PLATFORM;

const portMap = {
  'chrome': {
    // 3000 is used for web, 3001 is used for desktop
    dev: 3100,
    sourcemap: 31317,
  },
  'firefox': {
    dev: 3101,
    sourcemap: 31318,
  },
};

function getDevServerPort() {
  return portMap[portMapKey].dev;
}

function getSourceMapServerPort() {
  return portMap[portMapKey].sourcemap;
}

module.exports = {
  getDevServerPort,
  getSourceMapServerPort,
};
