const packageJson = require("../package.json");

module.exports = {
    NODE_ENV: process.env.NODE_ENV || "development",
    ASSET_PATH: process.env.ASSET_PATH || "/",
    EXT_PLATFORM: process.env.EXT_PLATFORM || "chrome",
    PORT: process.env.PORT || 9000,
    VERSION: process.env.VERSION || packageJson.version,
}