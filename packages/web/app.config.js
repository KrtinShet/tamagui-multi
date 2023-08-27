const packageJson = require('./package.json');

module.exports = {
  "expo": {
    "name": "Chai Wallet",
    "slug": "chai-wallet",
    "version": packageJson.version,
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "web": {
      "favicon": "./assets/favicon.png"
    }
  }
}