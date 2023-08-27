const lodash = require("lodash");
const notifier = require('node-notifier');
const webpack = require("webpack");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const developmentConsts = require("./developmentConstants");


const assetExtensions = [
  "jpg",
  "jpeg",
  "png",
  "gif",
  "eot",
  "otf",
  "svg",
  "ttf",
  "woff",
  "woff2",
];

function createDefaultResolveExtensions() {

  const assetExts = assetExtensions
    .map(extension => `.${extension}`);

  return [
    ...assetExts,
    '.web.ts',
    '.web.tsx',
    '.web.mjs',
    '.web.js',
    '.web.jsx',
    '.ts',
    '.tsx',
    '.mjs',
    '.cjs',
    '.js',
    '.jsx',
    '.json',
    '.wasm',
    '.d.ts',
  ];
}

class BuildDoneNotifyPlugin {
  apply(compiler) {
    compiler.hooks.done.tap(
      'BuildDoneNotifyPlugin',
      (compilation, callback) => {
        const msg = `Build at ${new Date().toLocaleTimeString()}`;
        setTimeout(() => {
          console.log('\u001b[33m'); // yellow color
          console.log('===================================');
          console.log(msg);
          console.log('===================================');
          console.log('\u001b[0m'); // reset color
        }, 300);
        notifier.notify(msg);
      },
    );
  }
}

function normalizeConfig({
  env,
  config,
  platform,
  configName,
  buildTargetBrowser,
}) {
  let resolveExtensions = createDefaultResolveExtensions();
  if (platform) {
    const isDev = process.env.NODE_ENV !== 'production';


    if (platform === developmentConsts.PLATFORMS.WEB) { }
    if (platform === developmentConsts.PLATFORMS.APP) { }
    if (platform === developmentConsts.PLATFORMS.EXT) { }

    config.plugins = [
      new webpack.DefinePlugin({
        process: {
          env: {}
        }
      }),
      ...config.plugins,
      // ...(isDev ? [new BuildDoneNotifyPlugin()] : []),
      isDev ? new ReactRefreshWebpackPlugin({ overlay: false }) : null,
      new webpack.ProvidePlugin({
        Buffer: ['buffer', 'Buffer'],
      }),

    ].filter(Boolean);

    resolveExtensions = [
      // .chrome-ext.ts, .firefox-ext.ts
      ...(buildTargetBrowser
        ? ['.ts', '.tsx', '.js', '.jsx'].map(
          (ext) => `.${buildTargetBrowser}-${platform}${ext}`,
        )
        : []),

      // // .ext-ui.ts, .ext-bg.ts
      ...(configName
        ? ['.ts', '.tsx', '.js', '.jsx'].map(
          (ext) => `.${platform}-${configName}${ext}`,
        )
        : []),
      // .ext.ts, .web.ts, .android.ts, .ios.ts, .native.ts
      ...['.ts', '.tsx', '.js', '.jsx'].map((ext) => `.${platform}${ext}`),
      ...resolveExtensions,
    ];
  }



  // support mjs
  config.module.rules.push({
    test: /\.mjs$/,
    include: /node_modules/,
    type: 'javascript/auto',
  });

  const normalizeModuleRule = (rule) => {
    if (!rule) return;

    if (
      rule.loader &&
      rule.loader.indexOf('file-loader') >= 0 &&
      rule.exclude
    ) {
      rule.exclude.push(/\.wasm$/);
      rule.exclude.push(/\.cjs$/);
      rule.exclude.push(
        /\.custom-file-loader-exclude-extensions-from-webpack-tools$/,
      );
    }

    if (rule.test && rule.test.toString() === '/\\.(mjs|[jt]sx?)$/') {
      // add *.cjs support
      // /\.(cjs|mjs|[jt]sx?)$/
      rule.test = /\.(cjs|mjs|[jt]sx?)$/;
    }

    if (rule.test && rule.test.toString() === '/\\.+(js|jsx|mjs|ts|tsx)$/') {
      // add *.cjs support
      // /\.+(cjs|js|jsx|mjs|ts|tsx)$/
      rule.test = /\.+(cjs|js|jsx|mjs|ts|tsx)$/;
    }

  };


  // let file-loader skip handle wasm files
  config.module.rules.forEach((rule) => {
    normalizeModuleRule(rule);
    (rule.oneOf || []).forEach((oneOf) => {
      normalizeModuleRule(oneOf);
    });
  });


  config.resolve.extensions = lodash
    .uniq(config.resolve.extensions.concat(resolveExtensions))
    .sort((a, b) => {
      // ".ext-ui.ts"  ".ext.ts"
      if (a.includes(platform) && b.includes(platform)) {
        return 0;
      }
      // sort platform specific extensions to the beginning
      return a.includes(platform) ? -1 : 0;
    });

  config.resolve.alias = {
    ...config.resolve.alias,
  };


  config.resolve.fallback = {
    ...config.resolve.fallback,
    'crypto': require.resolve('crypto-browserify'),
    'stream': require.resolve('stream-browserify'),
    'path': false,
    'https': false,
    'http': false,
    'net': false,
    'zlib': false,
    'tls': false,
    'child_process': false,
    // 'process': true,
    'fs': false,
    'util': false,
    'os': false,
    'buffer': require.resolve('buffer/'),
  };


  // config.optimization ??= {};
  // config.optimization.splitChunks ??= {};

  return config;
}

module.exports = {
  normalizeConfig,
  developmentConsts,
};