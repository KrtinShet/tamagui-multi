const baseManifest = require("./base");
const chromeManifest = require("./chrome-manifest");
const firefoxManifest = require("./firefox-manifest");
const env = require("./../../development/env");
const lodash = require("lodash");


function customizer(objValue, srcValue) {
  if (lodash.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
}

function getManifest() {
  switch (env.EXT_PLATFORM) {
    case "firefox":
      return lodash.mergeWith({}, baseManifest, firefoxManifest, customizer);
    case "chrome":
      return lodash.mergeWith({}, baseManifest, chromeManifest, customizer);
    default:
      throw new Error("Unknown browser");
  }
}
const manifest = getManifest();

module.exports = manifest;
