import { createActionCreator } from 'deox';

import { TGetQuestionGroupMaterials, TGetQuestionGroupResponse } from '@/services/api/question-group/get-question-group';

// CONSTANTS

export enum EGetQuestionGroupAction {
  GET_QUESTION_GROUP = 'GET_QUESTION_GROUP',
  GET_QUESTION_GROUP_REQUEST = 'GET_QUESTION_GROUP_REQUEST',
  GET_QUESTION_GROUP_SUCCESS = 'GET_QUESTION_GROUP_SUCCESS',
  GET_QUESTION_GROUP_FAILED = 'GET_QUESTION_GROUP_FAILED',
}

// TYPES

export type TGetQuestionGroupRequest = {
  type: EGetQuestionGroupAction.GET_QUESTION_GROUP_REQUEST;
  payload: {
    materials: TGetQuestionGroupMaterials;
    successCallback?: (response: TGetQuestionGroupResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetQuestionGroupSuccess = {
  type: EGetQuestionGroupAction.GET_QUESTION_GROUP_SUCCESS;
  payload: { response: TGetQuestionGroupResponse };
};

export type TGetQuestionGroupFailed = { type: EGetQuestionGroupAction.GET_QUESTION_GROUP_FAILED };

// FUNCTION

export const getQuestionGroupAction = {
  request: createActionCreator(
    EGetQuestionGroupAction.GET_QUESTION_GROUP_REQUEST,
    (resolve) =>
      (
        materials: TGetQuestionGroupMaterials,
        successCallback?: (response: TGetQuestionGroupResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetQuestionGroupRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetQuestionGroupAction.GET_QUESTION_GROUP_SUCCESS,
    (resolve) =>
      (response: TGetQuestionGroupResponse): TGetQuestionGroupSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetQuestionGroupAction.GET_QUESTION_GROUP_FAILED,
    (resolve) =>
      (error: unknown): TGetQuestionGroupFailed =>
        resolve({ error }),
  ),
};
