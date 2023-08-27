const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const developmentConsts = require("./../../development/developmentConstants");
const webpackTools = require("./../../development/webpackTool");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { ProgressPlugin } = require('webpack');
const platform = developmentConsts.PLATFORMS.WEB;
const ASSET_PATH = "/";

// const createExpoWebpackConfigAsync = require('@expo/webpack-config');
// console.log("WEBPACK CONFIG: ", platform);
// module.exports = async function (env, argv) {
//   let config = await createExpoWebpackConfigAsync(env, argv);

//   config.module.rules.push({
//     test: /\.(js|jsx|ts|tsx)$/,
//     use: {
//       loader: "babel-loader",
//       options: {
//         presets: ["@babel/preset-react", "@babel/preset-typescript"],
//       },
//     },
//   });

//   config.mode = process.env.NODE_ENV;

//   config = webpackTools.normalizeConfig({
//     config,
//     platform,
//     env,
//   })
//   return config;
// };

/**
 * @type {import('webpack').Configuration}
 */
let config = {
  entry: {
    index: "./App.tsx",
  },
  output: {
    filename: "[name].bundle.js",
    path: __dirname + "/dist",
    publicPath: ASSET_PATH,
    globalObject: 'this',
  },
  plugins: [
    new CleanWebpackPlugin({
      verbose: true,
      cleanStaleWebpackAssets: true,
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      chunks: ["index"],
      scriptLoading: "module",
      favicon: path.resolve(__dirname, "assets", "favicon.png"),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "assets"),
          to: path.resolve(__dirname, "dist", "assets"),
        },
      ],
    }),
    new ProgressPlugin(),
  ],
  resolve: {
    extensions: [],
    fallback: {},
    alias: {}
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-typescript"],
          },
        },
      },
    ],
  },
  mode: process.env.NODE_ENV,
};

config = webpackTools.normalizeConfig({
  config,
  platform,
});

module.exports = config;