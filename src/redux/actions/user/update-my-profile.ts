import { createActionCreator } from 'deox';

import { TUpdateMyProfileMaterials, TUpdateMyProfileResponse } from '@/services/api/user/update-my-profile';

// CONSTANTS

export enum EUpdateMyProfileAction {
  UPDATE_MY_PROFILE = 'UPDATE_MY_PROFILE',
  UPDATE_MY_PROFILE_REQUEST = 'UPDATE_MY_PROFILE_REQUEST',
  UPDATE_MY_PROFILE_SUCCESS = 'UPDATE_MY_PROFILE_SUCCESS',
  UPDATE_MY_PROFILE_FAILED = 'UPDATE_MY_PROFILE_FAILED',
}

// TYPES

export type TUpdateMyProfileRequest = {
  type: EUpdateMyProfileAction.UPDATE_MY_PROFILE_REQUEST;
  payload: {
    materials: TUpdateMyProfileMaterials;
    successCallback?: (response: TUpdateMyProfileResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TUpdateMyProfileSuccess = {
  type: EUpdateMyProfileAction.UPDATE_MY_PROFILE_SUCCESS;
  payload: { response: TUpdateMyProfileResponse };
};

export type TUpdateMyProfileFailed = { type: EUpdateMyProfileAction.UPDATE_MY_PROFILE_FAILED };

// FUNCTION

export const updateMyProfileAction = {
  request: createActionCreator(
    EUpdateMyProfileAction.UPDATE_MY_PROFILE_REQUEST,
    (resolve) =>
      (
        materials: TUpdateMyProfileMaterials,
        successCallback?: (response: TUpdateMyProfileResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TUpdateMyProfileRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EUpdateMyProfileAction.UPDATE_MY_PROFILE_SUCCESS,
    (resolve) =>
      (response: TUpdateMyProfileResponse): TUpdateMyProfileSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EUpdateMyProfileAction.UPDATE_MY_PROFILE_FAILED,
    (resolve) =>
      (error: unknown): TUpdateMyProfileFailed =>
        resolve({ error }),
  ),
};
