import { createActionCreator } from 'deox';

import { TCreateAssignmentMaterials, TCreateAssignmentResponse } from '@/services/api/assignment/create-assignment';

// CONSTANTS

export enum ECreateAssignmentAction {
  CREATE_ASSIGNMENT = 'CREATE_ASSIGNMENT',
  CREATE_ASSIGNMENT_REQUEST = 'CREATE_ASSIGNMENT_REQUEST',
  CREATE_ASSIGNMENT_SUCCESS = 'CREATE_ASSIGNMENT_SUCCESS',
  CREATE_ASSIGNMENT_FAILED = 'CREATE_ASSIGNMENT_FAILED',
}

// TYPES

export type TCreateAssignmentRequest = {
  type: ECreateAssignmentAction.CREATE_ASSIGNMENT_REQUEST;
  payload: {
    materials: TCreateAssignmentMaterials;
    successCallback?: (response: TCreateAssignmentResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TCreateAssignmentSuccess = {
  type: ECreateAssignmentAction.CREATE_ASSIGNMENT_SUCCESS;
  payload: { response: TCreateAssignmentResponse };
};

export type TCreateAssignmentFailed = { type: ECreateAssignmentAction.CREATE_ASSIGNMENT_FAILED };

// FUNCTION

export const createAssignmentAction = {
  request: createActionCreator(
    ECreateAssignmentAction.CREATE_ASSIGNMENT_REQUEST,
    (resolve) =>
      (
        materials: TCreateAssignmentMaterials,
        successCallback?: (response: TCreateAssignmentResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TCreateAssignmentRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    ECreateAssignmentAction.CREATE_ASSIGNMENT_SUCCESS,
    (resolve) =>
      (response: TCreateAssignmentResponse): TCreateAssignmentSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    ECreateAssignmentAction.CREATE_ASSIGNMENT_FAILED,
    (resolve) =>
      (error: unknown): TCreateAssignmentFailed =>
        resolve({ error }),
  ),
};
