const manifest = {
  manifest_version: 2,
  background: {
    scripts: ["background.bundle.js"],
    persistent: true,
  },
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
  browser_action: {
    default_title: "Chai Wallet",
    default_popup: "ui-popup.html",
    default_icon: {
      34: "assets/icons/icon-34.png",
      48: "assets/icons/icon-48.png",
      64: "assets/icons/icon-64.png",
      128: "assets/icons/icon-128.png",
    },
  },
  browser_specific_settings: {
    gecko: {
      strict_min_version: "100.0",
    },
  },
  permissions: ["webRequestBlocking"],
};

module.exports = manifest;
