import { createActionCreator } from 'deox';

import { TGetTestUserMaterials, TGetTestUserResponse } from '@/services/api/test/get-test-user';

// CONSTANTS

export enum EGetTestUserAction {
  GET_TEST_USER = 'GET_TEST_USER',
  GET_TEST_USER_REQUEST = 'GET_TEST_USER_REQUEST',
  GET_TEST_USER_SUCCESS = 'GET_TEST_USER_SUCCESS',
  GET_TEST_USER_FAILED = 'GET_TEST_USER_FAILED',
}

// TYPES

export type TGetTestUserRequest = {
  type: EGetTestUserAction.GET_TEST_USER_REQUEST;
  payload: {
    materials: TGetTestUserMaterials;
    successCallback?: (response: TGetTestUserResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetTestUserSuccess = {
  type: EGetTestUserAction.GET_TEST_USER_SUCCESS;
  payload: { response: TGetTestUserResponse };
};

export type TGetTestUserFailed = { type: EGetTestUserAction.GET_TEST_USER_FAILED };

// FUNCTION

export const getTestUserAction = {
  request: createActionCreator(
    EGetTestUserAction.GET_TEST_USER_REQUEST,
    (resolve) =>
      (
        materials: TGetTestUserMaterials,
        successCallback?: (response: TGetTestUserResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetTestUserRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetTestUserAction.GET_TEST_USER_SUCCESS,
    (resolve) =>
      (response: TGetTestUserResponse): TGetTestUserSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetTestUserAction.GET_TEST_USER_FAILED,
    (resolve) =>
      (error: unknown): TGetTestUserFailed =>
        resolve({ error }),
  ),
};
