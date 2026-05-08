import axios, { AxiosRequestConfig, AxiosResponse, AxiosError, AxiosInstance } from 'axios';
import Router from 'next/router';

import { EResponseCode, ETypeNotification } from '@/common/enums';

import Helpers from './helpers';
import { showNotification } from '@/utils/functions';
import { Paths } from '@/routers/constants';

const AuthorizedInstance = (baseURL: string): AxiosInstance => {
  const instance = axios.create({
    baseURL,
  });

  const onRequest = (request: AxiosRequestConfig): AxiosRequestConfig => {
    const authBearer = Helpers.getAccessToken();

    if (authBearer) {
      request.headers.Authorization = `Bearer ${authBearer}`;
    }

    return request;
  };

  const onResponseSuccess = (response: AxiosResponse): AxiosResponse => response;

  const onResponseError = async (axiosError: AxiosError): Promise<void | AxiosResponse<any>> => {
    const { response } = axiosError;
    const responseStatus = response?.status;
    const originalRequest = axiosError.config;

    if (responseStatus === EResponseCode.UNAUTHORIZED && originalRequest) {
      Helpers.clearTokens();
      Router.push(Paths.Login);
      showNotification(ETypeNotification.ERROR, 'Tài khoản đã hết hạn phiên sử dụng. Vui lòng đăng nhập lại.');
    }

    return Promise.reject(axiosError);
  };

  instance.interceptors.request.use(onRequest);
  instance.interceptors.response.use(onResponseSuccess, onResponseError);

  return instance;
};

export default AuthorizedInstance;
