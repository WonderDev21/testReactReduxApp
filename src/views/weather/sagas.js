import { takeEvery, call, put } from 'redux-saga/effects';
import { getOpenWeatherForcastApi } from 'api/openWeatherApi';
import { GETWEATERFORCAST } from './actionTypes';

import { getWeatherForcastSuccess, getWeatherForcastFail } from './reducer';

function* getWeatherForcastInfo(action) {
  try {
    const response = yield call(getOpenWeatherForcastApi, action.payload.city);
    if (response.cod === '200') {
      yield put(getWeatherForcastSuccess(response));
    } else {
      yield put(getWeatherForcastFail(response.cod));
    }
  } catch (err) {
    console.log('err:', err);
    yield put(getWeatherForcastFail(err));
  }
}

export const saga = function* () {
  yield takeEvery(GETWEATERFORCAST, getWeatherForcastInfo);
};
