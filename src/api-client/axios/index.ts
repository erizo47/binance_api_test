import type { AxiosStatic } from 'axios';
import requestInterceptor from '@/api-client/axios/request-interceptor';
import { errorResponseInterceptor, successResponseInterceptor } from '@/api-client/axios/response-interceptors';

function axiosInstanceBuilder(axios: AxiosStatic, baseURL: string) {
  const axiosInstance = axios.create({ baseURL });

  axios.defaults.withCredentials = true;
  axiosInstance.interceptors.request.use((config) => requestInterceptor(config));
  axiosInstance.interceptors.response.use(
    (response) => successResponseInterceptor(response),
    () => errorResponseInterceptor(),
  );

  return axiosInstance;
}

export default axiosInstanceBuilder;
