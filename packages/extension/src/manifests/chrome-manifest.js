const manifest = {
  manifest_version: 3,
  action: {
    default_title: "ChaiWallet",
    default_popup: "ui-popup.html",
    default_icon: {
      34: "assets/icons/icon-34.png",
      48: "assets/icons/icon-48.png",
      64: "assets/icons/icon-64.png",
      128: "assets/icons/icon-128.png",
    },
  },
  background: {
    service_worker: "background.bundle.js",
  },
  web_accessible_resources: [
    {
      resources: ["injected.js", "*.js.map"],
      use_dynamic_url: false,
      matches: ["file://*/*", "http://*/*", "https://*/*", "<all_urls>"],
    },
  ],
  permissions: [
    "offscreen"
  ],
  minimum_chrome_version: "103",
};

module.exports = manifest;
