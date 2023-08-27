import {
  isArray,
  isBoolean,
  isNull,
  isNumber,
  isPlainObject,
  isString,
  isUndefined,
  isFunction,
  isEmpty,
  isNil
} from 'lodash';
import { batch } from 'react-redux';
import platformEnv from '../platformEnv';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AnyAction } from 'redux';

export const DISPATCH_ACTION_BROADCAST_METHOD_NAME = 'dispatchActionBroadcast';
export const REPLACE_WHOLE_STATE = 'REPLACE_WHOLE_STATE';
export type IDispatchActionBroadcastParams = {
  actions?: PayloadAction[];
  $isDispatchFromBackground: boolean;
};

export function isSerializable(obj: any) {
  if (
    isUndefined(obj) ||
    isNull(obj) ||
    isBoolean(obj) ||
    isNumber(obj) ||
    isString(obj) ||
    obj instanceof Error
  ) {
    return true;
  }

  if (!isPlainObject(obj) && !isArray(obj)) {
    // like regex, date
    return false;
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const key in obj) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (!isSerializable(obj[key])) {
      return false;
    }
  }

  return true;
}

export function ensureSerializable(obj: any, stringify = false): any {
  if (process.env.NODE_ENV !== 'production') {
    if (!isSerializable(obj)) {
      console.error('Object should be serializable >>>> ', obj);
      if (stringify) {
        return JSON.parse(JSON.stringify(obj));
      }

      throw new Error('Object should be serializable');
    }
  }
  return obj;
}

export function throwCrossError(msg: string, ...args: any) {
  /**
   *  Enable it once the platformEnv is setup
   *  chuck it for now
   */
  if (platformEnv.isNative) {
    // `throw new Error()` won't print error object in iOS/Android,
    //    so we print it manually by `console.error()`
    console.error(msg, ...args);
  }
  throw new Error(msg);
}

export function ensurePromiseObject(
  obj: any,
  {
    serviceName,
    methodName,
  }: {
    serviceName: string;
    methodName: string;
  },
) {
  if (process.env.NODE_ENV !== 'production') {
    if (obj !== undefined && !(obj instanceof Promise)) {
      throwCrossError(
        `${serviceName ? `${serviceName}.` : ''
        }${methodName}() should be async or Promise method.`,
      );
    }
  }
}

export function throwMethodNotFound(...methods: string[]) {
  const msg = `DApp Provider or Background method not support (method=${methods.join(
    '.',
  )}), try to add method decorators @backgroundMethod() or @providerApiMethod()`;
  // @backgroundMethod() in background internal methods
  // @providerMethod() in background provider methods
  throwCrossError(msg);
}

export function buildReduxBatchAction(...actions: AnyAction[]) {
  if (!actions || !actions.length) {
    return undefined;
  }
  if (actions && actions.length > 1) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const batchAction = (dispatch: (p: any) => void, getState: any) => {
      // should only result in one combined re-render, not two
      batch(() => {
        actions.forEach((action) => {
          if (isFunction(action)) {
            throw new Error(
              'backgroundApi.dispatch ERROR:  async action is NOT allowed.',
            );
          }
          if (action) {
            action.$isDispatchFromBackground = true;
          }

          dispatch(action);
          ensureSerializable(action);
        });
      });
    };
    return batchAction;
  }

  const singleAction: AnyAction | undefined = actions?.[0];
  if (singleAction) {
    singleAction.$isDispatchFromBackground = true;
  }

  return singleAction;
}

export function waitAsync(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

export async function waitForDataLoaded({
  data,
  wait = 600,
  logName,
  timeout = 0,
}: {
  data: (...args: any) => any;
  wait?: number;
  logName: string;
  timeout?: number;
}) {
  let timeoutReject = false;
  let timer: any = null;
  const getDataArrFunc = ([] as ((...args: any) => any)[]).concat(data);
  if (timeout) {
    timer = setTimeout(() => {
      timeoutReject = true;
    }, timeout);
  }
  // eslint-disable-next-line no-constant-condition
  while (true) {
    let isAllLoaded = true;

    // if (logName && __DEV__) {
    //   console.log(`waitForDataLoaded: ${logName}`);
    // }
    await Promise.all(
      getDataArrFunc.map(async (getData) => {
        const d = await getData();
        if (d === false) {
          isAllLoaded = false;
          return;
        }

        if (isNil(d)) {
          isAllLoaded = false;
          return;
        }

        if (isEmpty(d)) {
          if (isPlainObject(d) || isArray(d)) {
            isAllLoaded = false;
          }
        }
      }),
    );

    if (isAllLoaded || timeoutReject) {
      break;
    }
    await waitAsync(wait);
  }
  clearTimeout(timer);
  if (timeoutReject) {
    throw new Error(`waitForDataLoaded: ${logName ?? ''} timeout`);
  }
}