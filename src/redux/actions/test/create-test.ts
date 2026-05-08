import { createActionCreator } from 'deox';

import { TCreateTestMaterials, TCreateTestResponse } from '@/services/api/test/create-test';

// CONSTANTS

export enum ECreateTestAction {
  CREATE_TEST = 'CREATE_TEST',
  CREATE_TEST_REQUEST = 'CREATE_TEST_REQUEST',
  CREATE_TEST_SUCCESS = 'CREATE_TEST_SUCCESS',
  CREATE_TEST_FAILED = 'CREATE_TEST_FAILED',
}

// TYPES

export type TCreateTestRequest = {
  type: ECreateTestAction.CREATE_TEST_REQUEST;
  payload: {
    materials: TCreateTestMaterials;
    successCallback?: (response: TCreateTestResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TCreateTestSuccess = {
  type: ECreateTestAction.CREATE_TEST_SUCCESS;
  payload: { response: TCreateTestResponse };
};

export type TCreateTestFailed = { type: ECreateTestAction.CREATE_TEST_FAILED };

// FUNCTION

export const createTestAction = {
  request: createActionCreator(
    ECreateTestAction.CREATE_TEST_REQUEST,
    (resolve) =>
      (
        materials: TCreateTestMaterials,
        successCallback?: (response: TCreateTestResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TCreateTestRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    ECreateTestAction.CREATE_TEST_SUCCESS,
    (resolve) =>
      (response: TCreateTestResponse): TCreateTestSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    ECreateTestAction.CREATE_TEST_FAILED,
    (resolve) =>
      (error: unknown): TCreateTestFailed =>
        resolve({ error }),
  ),
};
