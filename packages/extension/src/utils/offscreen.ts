// import { bridgeSetup } from "@chaiwallet-bridge/ext-hosted";
// import { IKeepAliveFeedbackMessage, IKeepAlivePayloadMessage } from "./background";

// run in offscreen or content-script
// export function startKeepAlivePolling() {
//   const reconnectToBg = () => {
//     // do nothing yet, reconnect by offscreenBridge?.portToBg checking
//     // chrome.runtime.sendMessage function do not required port to be established
//   };
//   const doPolling = async () => {
//     const msg: IKeepAlivePayloadMessage | undefined = {
//       keepAlive: true,
//       origin: window?.location?.origin,
//     };
//     try {
//       // @ts-ignore
//       const res: IKeepAliveFeedbackMessage | undefined =
//         // eslint-disable-next-line @typescript-eslint/await-thenable
//         await chrome.runtime.sendMessage(msg);
//       if (res?.rogerThat) {
//         console.log('keepAlive feedback:  ', res);
//       } else {
//         reconnectToBg();
//       }
//     } catch (error) {
//       console.error(error);
//       reconnectToBg();
//     }
//   };

//   doPolling();
//   setInterval(() => {
//     doPolling();
//   }, 20000);
// }


// export function offscreenSetup() {
//   const offscreenBridge = bridgeSetup.offscreen.createOffscreenJsBridge({
//     onPortConnect() { },
//     async receiveHandler(payload, bridge) {
//       const msg = payload.data as IOffscreenApiMessagePayload | undefined;
//       if (msg && msg.type === OFFSCREEN_API_MESSAGE_TYPE) {
//         const { module, method, params } = msg;
//         const moduleInstance: any = await offscreenApi.createOffscreenApiModule(
//           module,
//         );
//         if (moduleInstance && moduleInstance[method]) {
//           // TODO error handling
//           const result = await moduleInstance[method](...params);
//           // eslint-disable-next-line @typescript-eslint/no-unsafe-return
//           return result;
//         }
//         throw new Error(
//           `offscreen module method not found: ${module}.${method}()`,
//         );
//       }
//     },
//   });

//   window.extJsBridgeOffscreenToBg = offscreenBridge;
//   return offscreenBridge;
// }
