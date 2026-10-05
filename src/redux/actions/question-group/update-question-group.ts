import { createActionCreator } from 'deox';

import { TUpdateQuestionGroupMaterials, TUpdateQuestionGroupResponse } from '@/services/api/question-group/update-question-group';

// CONSTANTS

export enum EUpdateQuestionGroupAction {
  UPDATE_QUESTION_GROUP = 'UPDATE_QUESTION_GROUP',
  UPDATE_QUESTION_GROUP_REQUEST = 'UPDATE_QUESTION_GROUP_REQUEST',
  UPDATE_QUESTION_GROUP_SUCCESS = 'UPDATE_QUESTION_GROUP_SUCCESS',
  UPDATE_QUESTION_GROUP_FAILED = 'UPDATE_QUESTION_GROUP_FAILED',
}

// TYPES

export type TUpdateQuestionGroupRequest = {
  type: EUpdateQuestionGroupAction.UPDATE_QUESTION_GROUP_REQUEST;
  payload: {
    materials: TUpdateQuestionGroupMaterials;
    successCallback?: (response: TUpdateQuestionGroupResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TUpdateQuestionGroupSuccess = {
  type: EUpdateQuestionGroupAction.UPDATE_QUESTION_GROUP_SUCCESS;
  payload: { response: TUpdateQuestionGroupResponse };
};

export type TUpdateQuestionGroupFailed = { type: EUpdateQuestionGroupAction.UPDATE_QUESTION_GROUP_FAILED };

// FUNCTION

export const updateQuestionGroupAction = {
  request: createActionCreator(
    EUpdateQuestionGroupAction.UPDATE_QUESTION_GROUP_REQUEST,
    (resolve) =>
      (
        materials: TUpdateQuestionGroupMaterials,
        successCallback?: (response: TUpdateQuestionGroupResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TUpdateQuestionGroupRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EUpdateQuestionGroupAction.UPDATE_QUESTION_GROUP_SUCCESS,
    (resolve) =>
      (response: TUpdateQuestionGroupResponse): TUpdateQuestionGroupSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EUpdateQuestionGroupAction.UPDATE_QUESTION_GROUP_FAILED,
    (resolve) =>
      (error: unknown): TUpdateQuestionGroupFailed =>
        resolve({ error }),
  ),
};
