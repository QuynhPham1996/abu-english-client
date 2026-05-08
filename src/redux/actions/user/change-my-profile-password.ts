import { createActionCreator } from 'deox';

import {
  TChangeMyProfilePasswordMaterials,
  TChangeMyProfilePasswordResponse,
} from '@/services/api/user/change-my-profile-password';

// CONSTANTS

export enum EChangeMyProfilePasswordAction {
  CHANGE_MY_PROFILE_PASSWORD = 'CHANGE_MY_PROFILE_PASSWORD',
  CHANGE_MY_PROFILE_PASSWORD_REQUEST = 'CHANGE_MY_PROFILE_PASSWORD_REQUEST',
  CHANGE_MY_PROFILE_PASSWORD_SUCCESS = 'CHANGE_MY_PROFILE_PASSWORD_SUCCESS',
  CHANGE_MY_PROFILE_PASSWORD_FAILED = 'CHANGE_MY_PROFILE_PASSWORD_FAILED',
}

// TYPES

export type TChangeMyProfilePasswordRequest = {
  type: EChangeMyProfilePasswordAction.CHANGE_MY_PROFILE_PASSWORD_REQUEST;
  payload: {
    materials: TChangeMyProfilePasswordMaterials;
    successCallback?: (response: TChangeMyProfilePasswordResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TChangeMyProfilePasswordSuccess = {
  type: EChangeMyProfilePasswordAction.CHANGE_MY_PROFILE_PASSWORD_SUCCESS;
  payload: { response: TChangeMyProfilePasswordResponse };
};

export type TChangeMyProfilePasswordFailed = { type: EChangeMyProfilePasswordAction.CHANGE_MY_PROFILE_PASSWORD_FAILED };

// FUNCTION

export const changeMyProfilePasswordAction = {
  request: createActionCreator(
    EChangeMyProfilePasswordAction.CHANGE_MY_PROFILE_PASSWORD_REQUEST,
    (resolve) =>
      (
        materials: TChangeMyProfilePasswordMaterials,
        successCallback?: (response: TChangeMyProfilePasswordResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TChangeMyProfilePasswordRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EChangeMyProfilePasswordAction.CHANGE_MY_PROFILE_PASSWORD_SUCCESS,
    (resolve) =>
      (response: TChangeMyProfilePasswordResponse): TChangeMyProfilePasswordSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EChangeMyProfilePasswordAction.CHANGE_MY_PROFILE_PASSWORD_FAILED,
    (resolve) =>
      (error: unknown): TChangeMyProfilePasswordFailed =>
        resolve({ error }),
  ),
};
