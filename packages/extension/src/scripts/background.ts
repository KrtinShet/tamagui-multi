// import { bridgeSetup } from "@chaiwallet-bridge/ext-hosted"
// import platformEnv from "@chaiwallet/shared/src/platformEnv";
// import { setupKeepAlive } from "../utils/background";

// function initBg() {

//   const backgroundApiProxy: typeof
//     import("@chaiwallet/app/src/background/backgroundApiProxy").default =
//     require("@chaiwallet/app/src/background/backgroundApiProxy").default;

//   const bridge =
//     bridgeSetup.background.createHostBridge({
//       receiveHandler: backgroundApiProxy.bridgeReceiveHandler
//     });
//   backgroundApiProxy.connectBridge(bridge);
// }

// if (platformEnv.isExtensionBackgroundServiceWorker) {
//   setupKeepAlive();
// }

// initBg();

console.log("background.ts");