import { createActionCreator } from 'deox';

import { TLogoutMaterials, TLogoutResponse } from '@/services/api/auth/logout';

// CONSTANTS

export enum ELogoutAction {
  LOGOUT = 'LOGOUT',
  LOGOUT_REQUEST = 'LOGOUT_REQUEST',
  LOGOUT_SUCCESS = 'LOGOUT_SUCCESS',
  LOGOUT_FAILED = 'LOGOUT_FAILED',
}

// TYPES

export type TLogoutRequest = {
  type: ELogoutAction.LOGOUT_REQUEST;
  payload: {
    materials: TLogoutMaterials;
    successCallback?: (response: TLogoutResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TLogoutSuccess = {
  type: ELogoutAction.LOGOUT_SUCCESS;
  payload: { response: TLogoutResponse };
};

export type TLogoutFailed = { type: ELogoutAction.LOGOUT_FAILED };

// FUNCTION

export const logoutAction = {
  request: createActionCreator(
    ELogoutAction.LOGOUT_REQUEST,
    (resolve) =>
      (
        materials: TLogoutMaterials,
        successCallback?: (response: TLogoutResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TLogoutRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    ELogoutAction.LOGOUT_SUCCESS,
    (resolve) =>
      (response: TLogoutResponse): TLogoutSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    ELogoutAction.LOGOUT_FAILED,
    (resolve) =>
      (error: unknown): TLogoutFailed =>
        resolve({ error }),
  ),
};
