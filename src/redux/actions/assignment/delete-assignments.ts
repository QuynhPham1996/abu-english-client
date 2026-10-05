import { createActionCreator } from 'deox';

import { TDeleteAssignmentsMaterials, TDeleteAssignmentsResponse } from '@/services/api/assignment/delete-assignments';

// CONSTANTS

export enum EDeleteAssignmentsAction {
  DELETE_ASSIGNMENTS = 'DELETE_ASSIGNMENTS',
  DELETE_ASSIGNMENTS_REQUEST = 'DELETE_ASSIGNMENTS_REQUEST',
  DELETE_ASSIGNMENTS_SUCCESS = 'DELETE_ASSIGNMENTS_SUCCESS',
  DELETE_ASSIGNMENTS_FAILED = 'DELETE_ASSIGNMENTS_FAILED',
}

// TYPES

export type TDeleteAssignmentsRequest = {
  type: EDeleteAssignmentsAction.DELETE_ASSIGNMENTS_REQUEST;
  payload: {
    materials: TDeleteAssignmentsMaterials;
    successCallback?: (response: TDeleteAssignmentsResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TDeleteAssignmentsSuccess = {
  type: EDeleteAssignmentsAction.DELETE_ASSIGNMENTS_SUCCESS;
  payload: { response: TDeleteAssignmentsResponse };
};

export type TDeleteAssignmentsFailed = { type: EDeleteAssignmentsAction.DELETE_ASSIGNMENTS_FAILED };

// FUNCTION

export const deleteAssignmentsAction = {
  request: createActionCreator(
    EDeleteAssignmentsAction.DELETE_ASSIGNMENTS_REQUEST,
    (resolve) =>
      (
        materials: TDeleteAssignmentsMaterials,
        successCallback?: (response: TDeleteAssignmentsResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TDeleteAssignmentsRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EDeleteAssignmentsAction.DELETE_ASSIGNMENTS_SUCCESS,
    (resolve) =>
      (response: TDeleteAssignmentsResponse): TDeleteAssignmentsSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EDeleteAssignmentsAction.DELETE_ASSIGNMENTS_FAILED,
    (resolve) =>
      (error: unknown): TDeleteAssignmentsFailed =>
        resolve({ error }),
  ),
};
