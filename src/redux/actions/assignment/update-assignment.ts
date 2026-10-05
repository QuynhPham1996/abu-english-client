import { createActionCreator } from 'deox';

import { TUpdateAssignmentMaterials, TUpdateAssignmentResponse } from '@/services/api/assignment/update-assignment';

// CONSTANTS

export enum EUpdateAssignmentAction {
  UPDATE_ASSIGNMENT = 'UPDATE_ASSIGNMENT',
  UPDATE_ASSIGNMENT_REQUEST = 'UPDATE_ASSIGNMENT_REQUEST',
  UPDATE_ASSIGNMENT_SUCCESS = 'UPDATE_ASSIGNMENT_SUCCESS',
  UPDATE_ASSIGNMENT_FAILED = 'UPDATE_ASSIGNMENT_FAILED',
}

// TYPES

export type TUpdateAssignmentRequest = {
  type: EUpdateAssignmentAction.UPDATE_ASSIGNMENT_REQUEST;
  payload: {
    materials: TUpdateAssignmentMaterials;
    successCallback?: (response: TUpdateAssignmentResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TUpdateAssignmentSuccess = {
  type: EUpdateAssignmentAction.UPDATE_ASSIGNMENT_SUCCESS;
  payload: { response: TUpdateAssignmentResponse };
};

export type TUpdateAssignmentFailed = { type: EUpdateAssignmentAction.UPDATE_ASSIGNMENT_FAILED };

// FUNCTION

export const updateAssignmentAction = {
  request: createActionCreator(
    EUpdateAssignmentAction.UPDATE_ASSIGNMENT_REQUEST,
    (resolve) =>
      (
        materials: TUpdateAssignmentMaterials,
        successCallback?: (response: TUpdateAssignmentResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TUpdateAssignmentRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EUpdateAssignmentAction.UPDATE_ASSIGNMENT_SUCCESS,
    (resolve) =>
      (response: TUpdateAssignmentResponse): TUpdateAssignmentSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EUpdateAssignmentAction.UPDATE_ASSIGNMENT_FAILED,
    (resolve) =>
      (error: unknown): TUpdateAssignmentFailed =>
        resolve({ error }),
  ),
};
