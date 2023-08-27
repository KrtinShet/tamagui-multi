const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { ProgressPlugin, ProvidePlugin } = require("webpack");
const webpackTools = require("./../../development/webpackTool");
const CopyPlugin = require("copy-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const env = require("./development/env");
const manifest = require("./src/manifests/index");

process.env.VERSION = env.VERSION;
const ASSET_PATH = env.ASSET_PATH || "/";

const browser = env.EXT_PLATFORM;

const isManifestV3 = manifest.manifest_version >= 3;
// const isManifestV2 = !isManifestV3;

let options = {
  mode: env.NODE_ENV || "development",
  entry: {
    popup: path.resolve(__dirname, "src", "scripts", "popup.tsx"),
    background: path.resolve(__dirname, "src", "scripts", "background.ts"),
    "content-script": path.resolve(
      __dirname,
      "src",
      "scripts",
      "content-script.ts"
    ),
    'react-vendors': ['react']
  },
  
  output: {
    path: path.resolve(__dirname, "build", browser),
    filename: '[name].bundle.js',
    chunkFilename: `[name]-[chunkhash:6].chunk.js`,
    publicPath: ASSET_PATH,
    globalObject: 'this',
  },
  module: {
    rules: [
      {
        // look for .css or .scss files
        test: /\.(css|scss)$/,
        // in the `src` directory
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader", options: { sourceMap: true } },
        ],
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: [
          { loader: "source-map-loader" },
          { loader: "babel-loader" },
          { loader: 'esbuild-loader' },
          {
            loader: "tamagui-loader",
            options: {
              importsWhitelist: ['constants.js', 'colors.js'],
              components: ['tamagui']
            }

          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/i,
        issuer: /\.[jt]sx?$/,
        type: "asset/resource",
        exclude: /node_modules/,
        use: [
          {
            loader: "url-loader",
          },
          {
            loader: "file-loader"
          }
        ],
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ["@svgr/webpack"],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [],
    fallback: {
      // 'process/browser': require.resolve('process/browser')
    },
    alias: {},
  },
  plugins: [
    new CleanWebpackPlugin({
      verbose: true,
      cleanStaleWebpackAssets: true,
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "development", "index.html"),
      filename: "ui-popup.html",
      chunks: ["popup"],
      favicon: path.resolve(__dirname, "src", "assets", "icons", "favicon.png"),
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "development", "index.html"),
      filename: "ui-newwindow.html",
      chunks: ["popup"],
      favicon: path.resolve(__dirname, "src", "assets", "icons", "favicon.png"),
    }),
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "development", "index.html"),
      filename: "ui-newtab.html",
      chunks: ["popup"],
      favicon: path.resolve(__dirname, "src", "assets", "icons", "favicon.png"),
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src", "assets"),
          to: path.resolve(__dirname, "build", browser, "assets"),
        },
        {
          from: path.join(__dirname, "src", "manifests", "index.js"),
          to: path.join(__dirname, "build", browser, "manifest.json"),
          transform: (content, path) => {
            const manifest = require(path);
            return Buffer.from(JSON.stringify(manifest, null, 2));
          },
        },
        {
          from: path.join(__dirname, "..", "..", "bridge", "injected-provider", "dist", "injected", "injectedExtension.js"),
          to: path.join(__dirname, "build", browser, "injected.js"),
        }
      ],
    }),
    // new ProvidePlugin({
    //   process: "process/browser",
    // }),
    new ProgressPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [],
    splitChunks: {
      cacheGroups: {
        popup: {
          test: /popup/,
          name: "popup",
          chunks: "all",
          enforce: true,
        },
      },
    },
  },
  infrastructureLogging: {
    level: "info",
  },
  cache: {
    type: "filesystem",
  },
  stats: {
    errorDetails: true,
  },
};

if (env.NODE_ENV === "production") {
  options.optimization.minimize = true;
} else {
  options.devtool = "source-map";
  options.optimization = {
    minimize: false,
  };
}

if (isManifestV3) {
  options.optimization.splitChunks = undefined
  options.entry.offscreen = path.resolve(__dirname, "src", "scripts", "offscreen.ts")
  options.plugins.push(
    new HTMLWebpackPlugin({
      template: path.resolve(__dirname, "development", "index.html"),
      filename: "offscreen.html",
      chunks: ["offscreen"],
      favicon: path.resolve(__dirname, "src", "assets", "icons", "favicon.png"),
    }),
  )
};

options = webpackTools.normalizeConfig({
  config: options,
  platform: webpackTools.developmentConsts.PLATFORMS.EXT,
  buildTargetBrowser: browser,
});

module.exports = options;
