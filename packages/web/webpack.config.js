const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const developmentConsts = require("./../../development/developmentConstants");
const webpackTools = require("./../../development/webpackTool");
const platform = developmentConsts.PLATFORMS.WEB;

console.log("WEBPACK CONFIG: ", platform);
module.exports = async function (env, argv) {
  let config = await createExpoWebpackConfigAsync(env, argv);

  config.module.rules.push({
    test: /\.(js|jsx|ts|tsx)$/,
    use: { loader: "babel-loader" }
  });

  config = webpackTools.normalizeConfig({
    config,
    platform,
    env,
  })
  return config;
};
