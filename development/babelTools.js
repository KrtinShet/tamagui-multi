const developmentConsts = require("./developmentConstants");

function buildEnvExposedToClientDangerously({ platform }) {
  // *** ATTENTION: DO NOT expose any sensitive variable here ***
  // ***        like password, secretKey, etc.     ***
  const transformInlineEnvironmentVariables = [
    'NODE_ENV',
    'CHAIWALLET_PLATFORM',
    'VERSION',
    'EXT_PLATFORM',
    // 'BUILD_NUMBER',
    // 'EXT_INJECT_MODE',
  ];

  return transformInlineEnvironmentVariables;
}

function normalizeConfig({ platform, config }) {
  process.env.CHAIWALLET_PLATFORM = platform;

  if (platform === developmentConsts.PLATFORMS.WEB) { }
  if (platform === developmentConsts.PLATFORMS.APP) { }
  if (platform === developmentConsts.PLATFORMS.EXT) {
    config.plugins = [
      ...(config.plugins || []),
      [
        "module-resolver",
        {
          "alias": {
            "^react-native$": "react-native-web"
          }
        }
      ]
    ];
  }


  const BUILD_ENVS = require("./../packages/shared/src/buildEnv")
  config.plugins = [
    ...(config.plugins || []),
    [
      "transform-inline-environment-variables",
      {
        include: buildEnvExposedToClientDangerously({ platform })
      }
    ],
    [
      "transform-define",
      {
        "platformEnv.isDev": BUILD_ENVS.isDev,
        "platformEnv.isProduction": BUILD_ENVS.isProduction,
        "platformEnv.isWeb": BUILD_ENVS.isWeb,
        "platformEnv.isExtension": BUILD_ENVS.isExtension,
        "platformEnv.isNative": BUILD_ENVS.isNative,
        "platformEnv.isExtChrome": BUILD_ENVS.isExtChrome,
        "platformEnv.isExtFirefox": BUILD_ENVS.isExtFirefox
      }
    ],
    /**
     * Add more plugins here
     */
    "@babel/plugin-transform-private-methods",
    "@babel/plugin-transform-class-properties",
    "@babel/plugin-transform-private-property-in-object",
    ["@babel/plugin-proposal-private-methods", { loose: true }],
    ["@babel/plugin-proposal-class-properties", { loose: true }],
    ["@babel/plugin-proposal-private-property-in-object", { loose: true }],
  ]
  return config;
}

module.exports = {
  normalizeConfig,
  buildEnvExposedToClientDangerously,
  developmentConsts
}