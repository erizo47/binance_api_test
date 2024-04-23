import axios from 'axios';
import axiosInstanceBuilder from '@/api-client/axios';

const baseURL = import.meta.env.VITE_APP_API_BASE_URL as string ?? '';
export const $restRequest = axiosInstanceBuilder(axios, baseURL);
