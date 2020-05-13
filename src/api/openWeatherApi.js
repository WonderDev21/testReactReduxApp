import apiCall from 'libs/apiCall';

import { OpenWeatherMapKey } from 'config/env';

export const getOpenWeatherForcastApi = (city) =>
  apiCall(`/forecast?q=${city}&appid=${OpenWeatherMapKey}`);
