import cookie from 'react-cookies';

import env from '@/env';

const COOKIE_DOMAIN = env.cookie.domain;
export const COOKIE_ACCESS_TOKEN = `${COOKIE_DOMAIN}-atk`;
export const COOKIE_REFRESH_TOKEN = `${COOKIE_DOMAIN}-rtk`;
const LOCAL_STORAGE_REMEMBER_ACCOUNT = `${COOKIE_DOMAIN}-rma`;
// const MAXIMUM_EXPIRES_TIME = 2147483647;

const cookieSetting = {
  path: '/',
  secure: false,
  // domain: COOKIE_DOMAIN,
  // httpOnly: true,
  // expires: MAXIMUM_EXPIRES_TIME,
};

const setCookie = (name: string, value: string): void => cookie.save(name, value, cookieSetting);

const getCookie = (name: string): string => cookie.load(name);

const removeCookie = (name: string): void => cookie.remove(name, cookieSetting);

class Helpers {
  getRefreshToken = (): string => getCookie(COOKIE_REFRESH_TOKEN);

  storeRefreshToken = (refreshToken: string): void => setCookie(COOKIE_REFRESH_TOKEN, refreshToken);

  getAccessToken = (): string => getCookie(COOKIE_ACCESS_TOKEN);

  storeAccessToken = (accessToken: string): void => setCookie(COOKIE_ACCESS_TOKEN, accessToken);

  getDataRememberAccount = (): { [key: string]: any } => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem(LOCAL_STORAGE_REMEMBER_ACCOUNT) || '{}') || {};
    }

    return {};
  };

  setDataRememberAccount = (data: { [key: string]: any }): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_REMEMBER_ACCOUNT, JSON.stringify(data || {}) || '{}');
    }
  };

  clearTokens = (): void => {
    removeCookie(COOKIE_REFRESH_TOKEN);
    removeCookie(COOKIE_ACCESS_TOKEN);
  };
}

const instance = new Helpers();
export default instance;
