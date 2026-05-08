import { createActionCreator } from 'deox';

import { TGetTestsMaterials, TGetTestsResponse } from '@/services/api/test/get-tests';

// CONSTANTS

export enum EGetTestsAction {
  GET_TESTS = 'GET_TESTS',
  GET_TESTS_REQUEST = 'GET_TESTS_REQUEST',
  GET_TESTS_SUCCESS = 'GET_TESTS_SUCCESS',
  GET_TESTS_FAILED = 'GET_TESTS_FAILED',
}

// TYPES

export type TGetTestsRequest = {
  type: EGetTestsAction.GET_TESTS_REQUEST;
  payload: {
    materials: TGetTestsMaterials;
    successCallback?: (response: TGetTestsResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetTestsSuccess = {
  type: EGetTestsAction.GET_TESTS_SUCCESS;
  payload: { response: TGetTestsResponse };
};

export type TGetTestsFailed = { type: EGetTestsAction.GET_TESTS_FAILED };

// FUNCTION

export const getTestsAction = {
  request: createActionCreator(
    EGetTestsAction.GET_TESTS_REQUEST,
    (resolve) =>
      (
        materials: TGetTestsMaterials,
        successCallback?: (response: TGetTestsResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetTestsRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetTestsAction.GET_TESTS_SUCCESS,
    (resolve) =>
      (response: TGetTestsResponse): TGetTestsSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetTestsAction.GET_TESTS_FAILED,
    (resolve) =>
      (error: unknown): TGetTestsFailed =>
        resolve({ error }),
  ),
};
