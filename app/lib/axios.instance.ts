import type { AxiosError, AxiosResponse } from "axios";
import axios from "axios";

function successResponseInterceptor(response: AxiosResponse) {
  return response;
}

function errorResponseInterceptor(error: AxiosError) {
  console.info(`error: ${error}`);
  if (error.response?.data) {
    const errorMsg = error.response?.data as { message: string };
    console.log(errorMsg)
  } else {
    console.log(error)
  }
  return Promise.reject(error);
}

function apiInstance() {
  const instance = axios.create();
  instance.interceptors.response.use(
    successResponseInterceptor,
    errorResponseInterceptor
  );

  return instance;
}

export default apiInstance();
