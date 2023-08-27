import React from "react";
import { createRoot } from "react-dom/client";
import App from "@chaiwallet/app";


const renderApp = () => {
  const container = document.getElementById("app");
  if (container) {
    createRoot(container).render(<App />);
  }
};

function enableHotReload() {
  // @ts-expect-error
  if (module.hot) {
    // @ts-expect-error
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    module.hot?.accept();
  }
}

// const initUiJsBridge = () => {

//   const bridgeReceiveHandler = (payload: IBridgeMessagePayload) => {
//     console.log('bridgeReceiveHandler Ext-UI', payload);
//     const { method, params } = payload.data as IJsonRpcRequest;
//     if (method === DISPATCH_ACTION_BROADCAST_METHOD_NAME) {
//       const { actions } = params as IDispatchActionBroadcastParams;
//       if (actions && actions.length) {
//         const actionData = buildReduxBatchAction(...actions);
//         if (actionData) {
//           // * update Ext ui store
//           store.dispatch(actionData);
//         }
//       }
//     }
//   };

//   window.extJsBridgeUiToBg = bridgeSetup.ui.createUiJsBridge({
//     receiveHandler: bridgeReceiveHandler,
//     onPortConnect() { }
//   });

// }


function init() {
  // initUiJsBridge();

  if (process.env.NODE_ENV !== 'production') {
    enableHotReload();
  }

  renderApp();
}

init();
