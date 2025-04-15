import axios, { type AxiosInstance } from 'axios';
import Cookies from 'universal-cookie';
import { env } from '$env/dynamic/public'

const cookies = new Cookies();

const httpApi: AxiosInstance = axios.create({
  baseURL: env.PUBLIC_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
  }
});

// Add request interceptor to include authorization header
httpApi.interceptors.request.use((config) => {
  const token = cookies.get('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { httpApi };
