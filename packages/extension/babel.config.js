const { normalizeConfig, developmentConsts } = require('../../development/babelTools');

module.exports = function (api) {
  api.cache(true);
  return normalizeConfig({
    platform: developmentConsts.PLATFORMS.EXT,
    config: {
      presets: [
        'babel-preset-expo',
        ["@babel/preset-react", { "runtime": "automatic" }],
        "@babel/preset-env"
      ],
      plugins: ["@babel/plugin-transform-react-jsx"]
    }
  });
};