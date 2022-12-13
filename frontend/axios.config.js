import { Cookies } from 'react-cookie';
import axios from 'axios';

const cookies = new Cookies();

export const api = axios.create({
  baseURL: 'http://52.79.141.59:3001',
  responseType: 'json',

  headers: {
    'Content-Type': 'application/json',
  },
});

export const authApi = axios.create({
  baseURL: 'http://52.79.141.59:3001',
  responseType: 'json',

  headers: {
    'Content-Type': 'application/json',
    // accessToken: cookies.get('id'),
  },
});
authApi.defaults.headers.accessToken = cookies.get('id');
