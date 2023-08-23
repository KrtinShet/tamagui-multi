const createExpoWebpackConfigAsync = require('@expo/webpack-config');
const webpack = require('webpack')

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  // Customize the config before returning it.
  config.plugins.push(
    new webpack.DefinePlugin({
      process: {
        env: {
          TAMAGUI_TARGET: JSON.stringify('web'),
          DEV: process.env.NODE_ENV === 'development' ? 'true' : 'false',
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
      },
    })
  )
  config.resolve.alias['react-native$'] = 'react-native-web'
  return config;
};
