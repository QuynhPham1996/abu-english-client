import { createActionCreator } from 'deox';

import { TAddAssignmentGroupMaterials, TAddAssignmentGroupResponse } from '@/services/api/assignment/add-assignment-group';

// CONSTANTS

export enum EAddAssignmentGroupAction {
  ADD_ASSIGNMENT_GROUP = 'ADD_ASSIGNMENT_GROUP',
  ADD_ASSIGNMENT_GROUP_REQUEST = 'ADD_ASSIGNMENT_GROUP_REQUEST',
  ADD_ASSIGNMENT_GROUP_SUCCESS = 'ADD_ASSIGNMENT_GROUP_SUCCESS',
  ADD_ASSIGNMENT_GROUP_FAILED = 'ADD_ASSIGNMENT_GROUP_FAILED',
}

// TYPES

export type TAddAssignmentGroupRequest = {
  type: EAddAssignmentGroupAction.ADD_ASSIGNMENT_GROUP_REQUEST;
  payload: {
    materials: TAddAssignmentGroupMaterials;
    successCallback?: (response: TAddAssignmentGroupResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TAddAssignmentGroupSuccess = {
  type: EAddAssignmentGroupAction.ADD_ASSIGNMENT_GROUP_SUCCESS;
  payload: { response: TAddAssignmentGroupResponse };
};

export type TAddAssignmentGroupFailed = { type: EAddAssignmentGroupAction.ADD_ASSIGNMENT_GROUP_FAILED };

// FUNCTION

export const addAssignmentGroupAction = {
  request: createActionCreator(
    EAddAssignmentGroupAction.ADD_ASSIGNMENT_GROUP_REQUEST,
    (resolve) =>
      (
        materials: TAddAssignmentGroupMaterials,
        successCallback?: (response: TAddAssignmentGroupResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TAddAssignmentGroupRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EAddAssignmentGroupAction.ADD_ASSIGNMENT_GROUP_SUCCESS,
    (resolve) =>
      (response: TAddAssignmentGroupResponse): TAddAssignmentGroupSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EAddAssignmentGroupAction.ADD_ASSIGNMENT_GROUP_FAILED,
    (resolve) =>
      (error: unknown): TAddAssignmentGroupFailed =>
        resolve({ error }),
  ),
};
