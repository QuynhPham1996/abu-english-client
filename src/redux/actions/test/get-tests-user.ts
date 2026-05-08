import { createActionCreator } from 'deox';

import { TGetTestsUserMaterials, TGetTestsUserResponse } from '@/services/api/test/get-tests-user';

// CONSTANTS

export enum EGetTestsUserAction {
  GET_TESTS_USER = 'GET_TESTS_USER',
  GET_TESTS_USER_REQUEST = 'GET_TESTS_USER_REQUEST',
  GET_TESTS_USER_SUCCESS = 'GET_TESTS_USER_SUCCESS',
  GET_TESTS_USER_FAILED = 'GET_TESTS_USER_FAILED',
}

// TYPES

export type TGetTestsUserRequest = {
  type: EGetTestsUserAction.GET_TESTS_USER_REQUEST;
  payload: {
    materials: TGetTestsUserMaterials;
    successCallback?: (response: TGetTestsUserResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetTestsUserSuccess = {
  type: EGetTestsUserAction.GET_TESTS_USER_SUCCESS;
  payload: { response: TGetTestsUserResponse };
};

export type TGetTestsUserFailed = { type: EGetTestsUserAction.GET_TESTS_USER_FAILED };

// FUNCTION

export const getTestsUserAction = {
  request: createActionCreator(
    EGetTestsUserAction.GET_TESTS_USER_REQUEST,
    (resolve) =>
      (
        materials: TGetTestsUserMaterials,
        successCallback?: (response: TGetTestsUserResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetTestsUserRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetTestsUserAction.GET_TESTS_USER_SUCCESS,
    (resolve) =>
      (response: TGetTestsUserResponse): TGetTestsUserSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetTestsUserAction.GET_TESTS_USER_FAILED,
    (resolve) =>
      (error: unknown): TGetTestsUserFailed =>
        resolve({ error }),
  ),
};
