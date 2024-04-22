import type { InternalAxiosRequestConfig } from 'axios';

const requestInterceptor = (config: InternalAxiosRequestConfig) => {
  if (config.url !== 'https://') {
    const token = localStorage.getItem('authToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (refreshToken) {
      config.headers['Refresh-Token'] = refreshToken;
    }
  }

  return config;
};

export default requestInterceptor;
