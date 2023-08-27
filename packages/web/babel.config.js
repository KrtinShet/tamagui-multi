const { normalizeConfig, developmentConsts } = require('../../development/babelTools');

module.exports = function (api) {
  api.cache(true);
  return normalizeConfig({
    platform: developmentConsts.PLATFORMS.WEB,
    /**
     * @type {import('@babel/core').TransformOptions}
     */
    config: {
      presets: [
        'babel-preset-expo',
        "@babel/preset-react",
        "@babel/preset-typescript",
        // ["@babel/preset-env", {
        //   "corejs": 2,
        //   "sourceType": "module",
        //   "targets": {
        //     "browsers": ["last 2 versions", "ie >= 11"]
        //   },
        //   "useBuiltIns": "usage"
        // }]
      ],
    },
  });
};