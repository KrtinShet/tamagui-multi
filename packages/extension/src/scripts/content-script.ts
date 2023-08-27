// import { bridgeSetup } from '@chaiwallet-bridge/ext-hosted'
// import platformEnv from '@chaiwallet/shared/src/platformEnv';

// export function shouldInject() {
//   const { hostname } = window.location;
//   const blackList = ['opensea.io'];
//   if (blackList.includes(hostname)) {
//     return false;
//   }
//   return true;
// }


// let removeScriptTagAfterInject = true;
// if (process.env.NODE_ENV !== 'production') {
//   removeScriptTagAfterInject = false;
// }

// if (shouldInject()) {
//   if (platformEnv.isManifestV3) {
//     bridgeSetup.contentScript.inject({
//       file: `injected.js?${Date.now()}`,
//       remove: removeScriptTagAfterInject,
//     })
//   } else {
//     bridgeSetup.contentScript.inject({
//       file: `injected.js?${Date.now()}`,
//       remove: removeScriptTagAfterInject,
//     })
//   }
// }

// bridgeSetup.contentScript.setupMessagePort();

console.log('content-script.ts')