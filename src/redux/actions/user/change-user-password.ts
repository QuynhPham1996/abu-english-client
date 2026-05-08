import { createActionCreator } from 'deox';

import { TChangeUserPasswordMaterials, TChangeUserPasswordResponse } from '@/services/api/user/change-user-password';

// CONSTANTS

export enum EChangeUserPasswordAction {
  CHANGE_USER_PASSWORD = 'CHANGE_USER_PASSWORD',
  CHANGE_USER_PASSWORD_REQUEST = 'CHANGE_USER_PASSWORD_REQUEST',
  CHANGE_USER_PASSWORD_SUCCESS = 'CHANGE_USER_PASSWORD_SUCCESS',
  CHANGE_USER_PASSWORD_FAILED = 'CHANGE_USER_PASSWORD_FAILED',
}

// TYPES

export type TChangeUserPasswordRequest = {
  type: EChangeUserPasswordAction.CHANGE_USER_PASSWORD_REQUEST;
  payload: {
    materials: TChangeUserPasswordMaterials;
    successCallback?: (response: TChangeUserPasswordResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TChangeUserPasswordSuccess = {
  type: EChangeUserPasswordAction.CHANGE_USER_PASSWORD_SUCCESS;
  payload: { response: TChangeUserPasswordResponse };
};

export type TChangeUserPasswordFailed = { type: EChangeUserPasswordAction.CHANGE_USER_PASSWORD_FAILED };

// FUNCTION

export const changeUserPasswordAction = {
  request: createActionCreator(
    EChangeUserPasswordAction.CHANGE_USER_PASSWORD_REQUEST,
    (resolve) =>
      (
        materials: TChangeUserPasswordMaterials,
        successCallback?: (response: TChangeUserPasswordResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TChangeUserPasswordRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EChangeUserPasswordAction.CHANGE_USER_PASSWORD_SUCCESS,
    (resolve) =>
      (response: TChangeUserPasswordResponse): TChangeUserPasswordSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EChangeUserPasswordAction.CHANGE_USER_PASSWORD_FAILED,
    (resolve) =>
      (error: unknown): TChangeUserPasswordFailed =>
        resolve({ error }),
  ),
};
