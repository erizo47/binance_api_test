import type { AxiosResponse } from 'axios';

export const successResponseInterceptor = (response: AxiosResponse) => Promise.resolve(response.data);

export const errorResponseInterceptor = async () => Promise.reject();
