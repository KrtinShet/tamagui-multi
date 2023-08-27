const packageJson = require("../../package.json");

module.exports = {
  author: packageJson.author,
  homepage_url: "https://chaidex.com",
  version: packageJson.version,
  name: "Chai Wallet",
  description: packageJson.description,
  short_name: "Chai Wallet",
  permissions: ["storage", "tabs", "activeTab", "scripting"],
  commands: {
    _execute_action: {
      suggested_key: {
        windows: "Alt+Shift+C",
        mac: "Alt+Shift+C",
        chromeos: "Alt+Shift+C",
        linux: "Alt+Shift+C",
      },
    },
  },
  content_scripts: [
    {
      // "matches": ["file://*/*", "http://*/*", "https://*/*", '<all_urls>'],
      matches: ["<all_urls>"],
      js: ["content-script.bundle.js"],
      run_at: "document_start", // MUST be document_start to inject ASAP
      all_frames: true, // including iframe inject
    },
    // HW wallets will be supported soon.
    // {
    //   "matches": ["*://connect.trezor.io/*/popup.html"],
    //   "js": ["vendor/trezor-content.js"],
    //   "run_at": "document_start"
    // }
  ],
  icons: {
    34: "assets/icons/icon-34.png",
    48: "assets/icons/icon-48.png",
    64: "assets/icons/icon-64.png",
    128: "assets/icons/icon-128.png",
  },
};
