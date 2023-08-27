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
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.chaiwallet.mobile"
    },
    "extra": {
      "eas": {
        "projectId": "26b8ed3c-9282-417b-a853-a977cf0e2ef2"
      }
    }
  }
}
