import { createActionCreator } from 'deox';

import { TGetAssignmentsMaterials, TGetAssignmentsResponse } from '@/services/api/assignment/get-assignments';

// CONSTANTS

export enum EGetAssignmentsAction {
  GET_ASSIGNMENTS = 'GET_ASSIGNMENTS',
  GET_ASSIGNMENTS_REQUEST = 'GET_ASSIGNMENTS_REQUEST',
  GET_ASSIGNMENTS_SUCCESS = 'GET_ASSIGNMENTS_SUCCESS',
  GET_ASSIGNMENTS_FAILED = 'GET_ASSIGNMENTS_FAILED',
}

// TYPES

export type TGetAssignmentsRequest = {
  type: EGetAssignmentsAction.GET_ASSIGNMENTS_REQUEST;
  payload: {
    materials: TGetAssignmentsMaterials;
    successCallback?: (response: TGetAssignmentsResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetAssignmentsSuccess = {
  type: EGetAssignmentsAction.GET_ASSIGNMENTS_SUCCESS;
  payload: { response: TGetAssignmentsResponse };
};

export type TGetAssignmentsFailed = { type: EGetAssignmentsAction.GET_ASSIGNMENTS_FAILED };

// FUNCTION

export const getAssignmentsAction = {
  request: createActionCreator(
    EGetAssignmentsAction.GET_ASSIGNMENTS_REQUEST,
    (resolve) =>
      (
        materials: TGetAssignmentsMaterials,
        successCallback?: (response: TGetAssignmentsResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetAssignmentsRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetAssignmentsAction.GET_ASSIGNMENTS_SUCCESS,
    (resolve) =>
      (response: TGetAssignmentsResponse): TGetAssignmentsSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetAssignmentsAction.GET_ASSIGNMENTS_FAILED,
    (resolve) =>
      (error: unknown): TGetAssignmentsFailed =>
        resolve({ error }),
  ),
};
