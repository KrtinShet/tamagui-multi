import { Platform } from 'react-native';

type IPlatform = "web" | "extension" | "native";


type IPlatformEnv = {
  platform?: IPlatform;
  NODE_ENV?: string;
  isDev?: boolean;
  isProduction?: boolean;
  isWeb?: boolean;
  isExtension?: boolean;
  isNative?: boolean;
  isExtChrome?: boolean;
  isExtFirefox?: boolean;
  isNativeAndroid?: boolean;
  isNativeIOS?: boolean;
  isRuntimeBrowser?: boolean;
  isRuntimeFirefox?: boolean;
  isExtensionBackgroundHtml?: boolean;
  isManifestV3?: boolean;
  isExtensionBackgroundServiceWorker?: boolean;
  isExtensionBackground?: boolean;
  isExtensionUi?: boolean;
  isExtensionUiPopup?: boolean;
  isExtensionUinewwindow?: boolean;
  isExtensionUinewtab?: boolean;
  canGetClipboard?: boolean;
}

const {
  isDev,
  isProduction,
  isWeb,
  isExtension,
  isNative,
  isExtChrome,
  isExtFirefox
}: {
  isDev: boolean,
  isProduction: boolean,
  isWeb: boolean,
  isExtension: boolean,
  isNative: boolean,
  isExtChrome: boolean,
  isExtFirefox: boolean
} = require("./buildEnv.js")



const isNativeAndroid = isNative && Platform.OS === "android"
const isNativeIOS = isNative && Platform.OS === "ios"
const isRuntimeBrowser: boolean = typeof window !== 'undefined' && !isNative;
// // @ts-ignore
// const isRuntimeFirefox: boolean = typeof InstallTrigger !== 'undefined';
// Ext manifest v2 background
export const isExtensionBackgroundHtml: boolean =
  isExtension &&
  isRuntimeBrowser &&
  window.location.pathname.startsWith('/background.html');

export const isManifestV3: boolean =
  // TODO firefox check v3
  isExtension && chrome?.runtime?.getManifest?.()?.manifest_version === 3;

// Ext manifest v3 background
export const isExtensionBackgroundServiceWorker: boolean =
  isExtension &&
  !isRuntimeBrowser &&
  isManifestV3;
// // @ts-ignore
// Boolean(global.serviceWorker) &&
// // @ts-ignore
// global.serviceWorker instanceof ServiceWorker;

export const isExtensionBackground: boolean =
  isExtensionBackgroundHtml || isExtensionBackgroundServiceWorker;

export const isExtensionUi: boolean =
  isExtension &&
  isRuntimeBrowser &&
  window.location.pathname.startsWith('/ui-');

export const isExtensionUiPopup: boolean =
  isExtensionUi && window.location.pathname.startsWith('/ui-popup.html');

export const isExtensionUinewwindow: boolean =
  isExtensionUi &&
  window.location.pathname.startsWith('/ui-newwindow.html');

export const isExtensionUinewtab: boolean =
  isExtensionUi &&
  window.location.pathname.startsWith('/ui-newtab.html');

export const canGetClipboard: boolean = !isWeb && !isExtension;

const NODE_ENV = isDev ? "development" : "production";

const platformEnv: IPlatformEnv = {
  platform: isWeb ? "web" : isExtension ? "extension" : isNative ? "native" : undefined,
  NODE_ENV,
  isDev,
  isProduction,

  isWeb,
  isRuntimeBrowser,

  isExtension,
  isExtChrome,
  isExtFirefox,
  isExtensionBackground,
  isExtensionBackgroundHtml,
  isExtensionBackgroundServiceWorker,
  isExtensionUi,
  isExtensionUiPopup,
  isExtensionUinewwindow,
  isExtensionUinewtab,
  isManifestV3,
  // isRuntimeFirefox,

  isNative,
  isNativeAndroid,
  isNativeIOS,

  canGetClipboard,

}


export default platformEnv;