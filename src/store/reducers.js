/*
 * combines all th existing reducers
 */

import { combineReducers } from 'redux';
import { weatherReducer } from 'views/weather/reducer';

const appReducer = combineReducers({
  weather: weatherReducer,

  // but its referenced here
});

const rootReducer = (state, action) => {
  return appReducer(state, action);
};

export default rootReducer;
