const isDev = process.env.NODE_ENV !== 'production';
const isProduction = process.env.NODE_ENV === 'production';
const isWeb = process.env.CHAIWALLET_PLATFORM === 'web';
const isExtension = process.env.CHAIWALLET_PLATFORM === 'ext';
const isNative = process.env.CHAIWALLET_PLATFORM === 'app';
const isExtChrome = process.env.EXT_PLATFORM === 'chrome';
const isExtFirefox = process.env.EXT_PLATFORM === 'firefox';

module.exports = {
  isDev,
  isProduction,
  isWeb,
  isExtension,
  isNative,
  isExtChrome,
  isExtFirefox
}