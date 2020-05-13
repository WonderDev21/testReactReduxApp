import { createAction } from 'redux-actions';
import _identity from 'lodash/identity';
import { REQUEST_STATUS } from 'config/constants';

export const requestSuccess = (actionType) => `${actionType}/success`;

export const requestFail = (actionType) => `${actionType}/fail`;

export const requestResetState = (actionType) => `${actionType}/reset`;

export const isActionSuccess = (actionType) =>
  actionType.substr(-8) === '/success';

export const isActionFail = (actionType) => actionType.substr(-5) === '/fail';

export const isActionReset = (actionType) => actionType.substr(-6) === '/reset';

const mergeMeta = (metaOptions) => (payload) => ({
  ...metaOptions,
  ...(payload ? payload.meta : {}),
});

export const defineLoopActions = (actionType, metaOptions = null) => ({
  start: createAction(
    actionType,
    ({ skipPendingState, ...originalPayload } = {}) => originalPayload,
    (payload) => ({
      skipPendingState: payload && !!payload.skipPendingState,
    })
  ),
  success: createAction(
    requestSuccess(actionType),
    _identity,
    mergeMeta(metaOptions)
  ),
  fail: createAction(
    requestFail(actionType),
    _identity,
    mergeMeta(metaOptions)
  ),
  reset: createAction(requestResetState(actionType)),
});

export function isLoading(requestState) {
  return (
    requestState === REQUEST_STATUS.INITIAL ||
    requestState === REQUEST_STATUS.PENDING
  );
}

export function needsLoading(requestState, strict = false) {
  if (strict) {
    return requestState === REQUEST_STATUS.INITIAL;
  }
  return (
    requestState === REQUEST_STATUS.INITIAL ||
    requestState === REQUEST_STATUS.FAIL
  );
}

export function isPending(requestState) {
  return requestState === REQUEST_STATUS.PENDING;
}

export function hasSucceeded(requestState) {
  return requestState === REQUEST_STATUS.SUCCESS;
}

export function hasFailed(requestState) {
  return requestState === REQUEST_STATUS.FAIL;
}

export function requestLoopHandlers(config) {
  /*
   * This function will be used for registering async request loop handlers for update request
   * such as GET, POST, PUT and DELETE RESTful API calls.
   * It'll handle initial, success and fail cases.
   * `action` and `stateField` are required as config values.
   */
  let { action, onStart, onSuccess, onFail, onEnd } = config;

  if (!action) {
    throw new Error(
      'action and stateField should be set for generating update request loop handlers'
    );
  }

  return {
    [action]: (state, { payload }) => {
      if (onStart) {
        return onStart(state, payload);
      } else {
        return { ...state, state: REQUEST_STATUS.PENDING };
      }
    },
    [requestSuccess(action)]: (state, { payload }) => {
      if (onSuccess) {
        return onSuccess(state, payload);
      } else {
        return { ...state, state: REQUEST_STATUS.SUCCESS };
      }
    },
    [requestFail(action)]: (state, { payload }) => {
      if (onFail) {
        return onFail(state, payload);
      } else {
        return {
          ...state,
          state: REQUEST_STATUS.FAIL,
          error: { code: payload.status_code, message: payload.status_message },
        };
      }
    },
    [requestResetState(action)]: (state, { payload }) => {
      if (onEnd) {
        return onEnd(state, payload);
      } else {
        return { ...state, state: REQUEST_STATUS.INITIAL };
      }
    },
  };
}
