import type { InternalAxiosRequestConfig } from 'axios';

const requestInterceptor = (config: InternalAxiosRequestConfig) => config;

export default requestInterceptor;
