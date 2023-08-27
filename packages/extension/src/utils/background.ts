
export type IKeepAlivePayloadMessage = { keepAlive?: boolean; origin?: string };
export type IKeepAliveFeedbackMessage = { rogerThat: boolean; time: string };

async function createOffscreen() {
  if (await chrome.offscreen.hasDocument?.()) return;
  chrome.offscreen.createDocument({
    url: 'offscreen.html',
    //@ts-ignore
    reasons: ['BLOBS'],
    justification: 'keep background running and alive',
  });
}

export function setupKeepAlive() {
  createOffscreen();
  setTimeout(() => {
    createOffscreen();
  }, 1000);
  chrome.runtime.onStartup.addListener(() => {
    createOffscreen();
  });
  // a message from an offscreen document every 20 second resets the inactivity timer
  chrome.runtime.onMessage.addListener(
    (
      msg: IKeepAlivePayloadMessage | undefined,
      sender: chrome.runtime.MessageSender,
      sendResponse: (response?: any) => void,
    ) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (msg?.keepAlive) {
        const time = new Date().toLocaleString();
        console.log('keepAlive:  ', msg?.origin, time);
        sendResponse({ rogerThat: true, time } as IKeepAliveFeedbackMessage);
      }
    },
  );
}


