import { createActionCreator } from 'deox';

import { TGradedTestMaterials, TGradedTestResponse } from '@/services/api/test/graded-test';

// CONSTANTS

export enum EGradedTestAction {
  GRADED_TEST = 'GRADED_TEST',
  GRADED_TEST_REQUEST = 'GRADED_TEST_REQUEST',
  GRADED_TEST_SUCCESS = 'GRADED_TEST_SUCCESS',
  GRADED_TEST_FAILED = 'GRADED_TEST_FAILED',
}

// TYPES

export type TGradedTestRequest = {
  type: EGradedTestAction.GRADED_TEST_REQUEST;
  payload: {
    materials: TGradedTestMaterials;
    successCallback?: (response: TGradedTestResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGradedTestSuccess = {
  type: EGradedTestAction.GRADED_TEST_SUCCESS;
  payload: { response: TGradedTestResponse };
};

export type TGradedTestFailed = { type: EGradedTestAction.GRADED_TEST_FAILED };

// FUNCTION

export const gradedTestAction = {
  request: createActionCreator(
    EGradedTestAction.GRADED_TEST_REQUEST,
    (resolve) =>
      (
        materials: TGradedTestMaterials,
        successCallback?: (response: TGradedTestResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGradedTestRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGradedTestAction.GRADED_TEST_SUCCESS,
    (resolve) =>
      (response: TGradedTestResponse): TGradedTestSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGradedTestAction.GRADED_TEST_FAILED,
    (resolve) =>
      (error: unknown): TGradedTestFailed =>
        resolve({ error }),
  ),
};
