import { createActionCreator } from 'deox';

import { TGetAssignmentMaterials, TGetAssignmentResponse } from '@/services/api/assignment/get-assignment';

// CONSTANTS

export enum EGetAssignmentAction {
  GET_ASSIGNMENT = 'GET_ASSIGNMENT',
  GET_ASSIGNMENT_REQUEST = 'GET_ASSIGNMENT_REQUEST',
  GET_ASSIGNMENT_SUCCESS = 'GET_ASSIGNMENT_SUCCESS',
  GET_ASSIGNMENT_FAILED = 'GET_ASSIGNMENT_FAILED',
}

// TYPES

export type TGetAssignmentRequest = {
  type: EGetAssignmentAction.GET_ASSIGNMENT_REQUEST;
  payload: {
    materials: TGetAssignmentMaterials;
    successCallback?: (response: TGetAssignmentResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetAssignmentSuccess = {
  type: EGetAssignmentAction.GET_ASSIGNMENT_SUCCESS;
  payload: { response: TGetAssignmentResponse };
};

export type TGetAssignmentFailed = { type: EGetAssignmentAction.GET_ASSIGNMENT_FAILED };

// FUNCTION

export const getAssignmentAction = {
  request: createActionCreator(
    EGetAssignmentAction.GET_ASSIGNMENT_REQUEST,
    (resolve) =>
      (
        materials: TGetAssignmentMaterials,
        successCallback?: (response: TGetAssignmentResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetAssignmentRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetAssignmentAction.GET_ASSIGNMENT_SUCCESS,
    (resolve) =>
      (response: TGetAssignmentResponse): TGetAssignmentSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetAssignmentAction.GET_ASSIGNMENT_FAILED,
    (resolve) =>
      (error: unknown): TGetAssignmentFailed =>
        resolve({ error }),
  ),
};
