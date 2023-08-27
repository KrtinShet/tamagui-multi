const { normalizeConfig, developmentConsts } = require('../../development/babelTools');

module.exports = function (api) {
  api.cache(true);
  return normalizeConfig({
    platform: developmentConsts.PLATFORMS.APP,
    config: {
      presets: ['babel-preset-expo']
    }
  });
};