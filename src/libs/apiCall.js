// General api to access data
import axios from 'axios';
import ApiConstants from 'api/ApiConstants';
export default async function apiCall(
  path = '',
  data = null,
  method = 'GET',
  token = null
) {
  const dataOrParams = ['GET'].includes(method) ? 'params' : 'data';

  let url = ApiConstants.BASE_URL + path;

  console.log(url, data, token);

  return axios
    .request({
      url,
      method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        ...(token && { 'ACCESS-TOKEN': token }),
      },
      [dataOrParams]: data,
    })
    .then((resp) => resp.data)
    .then((json) => json)
    .catch((error) => {
      return error.response.data;
    });
}
