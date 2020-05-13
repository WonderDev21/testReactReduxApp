import { handleActions } from 'redux-actions';

import { defineLoopActions, requestLoopHandlers } from 'libs/state';
import { REQUEST_STATUS } from 'config/constants';

import { GETWEATERFORCAST } from './actionTypes';

/* Initial state */
const initialState = {
  weather_info: {},
  error: {},
  state: REQUEST_STATUS.INITIAL,
};

export const {
  start: getWeatherForcast,
  success: getWeatherForcastSuccess,
  fail: getWeatherForcastFail,
} = defineLoopActions(GETWEATERFORCAST);

export const weatherReducer = handleActions(
  {
    ...requestLoopHandlers({
      action: GETWEATERFORCAST,
      onSuccess: (state, payload) => {
        return {
          ...state,
          weather_info: payload,
          state: REQUEST_STATUS.SUCCESS,
        };
      },
      onFail: (state, payload) => {
        return {
          ...state,
          weather_info: {},
          state: REQUEST_STATUS.FAIL,
        };
      },
    }),
  },
  initialState
);
