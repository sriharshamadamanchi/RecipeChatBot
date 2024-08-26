import axios from 'axios';
import Config from 'react-native-config';
import { API_TIMEOUT } from '../constants';

// Set content type as JSON for all post requests.
axios.defaults.headers.post['Content-Type'] = 'application/json';

const API_KEY = Config.SPOONACULAR_API_KEY;

export const mainAxios: any = axios.create({
  baseURL: Config.BASE_URL,
  timeout: API_TIMEOUT
});

// Add a request interceptor
const requestInterceptor = {
  onSuccess: async (config: any) => {
    try {
    } catch (error) {
      console.log('error in axios.interceptors.request', error);
    }

    const type = config.url.includes('?') ? '&' : '?';

    config.url = config.url + type + `apiKey=${API_KEY}`;

    if (__DEV__) {
      console.log('req', config);
    }
    return config;
  },
  onError: (error: any): any => {
    Promise.reject(error);
  }
};

mainAxios.interceptors.request.use(
  requestInterceptor.onSuccess,
  requestInterceptor.onError
);

// Add a response interceptor
const responseInterceptor = {
  onSuccess: (response: any): any => {
    if (__DEV__) {
      console.log('response', response);
    }

    if (
      typeof response.data.success !== 'undefined' &&
      response.data.success === false
    ) {
      return Promise.reject(new Error(response.data.message));
    }

    return response;
  },
  onError: async (error: any) => {
    console.log('onError', error);

    return Promise.reject(error);
  }
};

mainAxios.interceptors.response.use(
  responseInterceptor.onSuccess,
  responseInterceptor.onError
);
