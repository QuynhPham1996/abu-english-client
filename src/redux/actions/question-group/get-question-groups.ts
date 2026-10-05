import { createActionCreator } from 'deox';

import { TGetQuestionGroupsMaterials, TGetQuestionGroupsResponse } from '@/services/api/question-group/get-question-groups';

// CONSTANTS

export enum EGetQuestionGroupsAction {
  GET_QUESTION_GROUPS = 'GET_QUESTION_GROUPS',
  GET_QUESTION_GROUPS_REQUEST = 'GET_QUESTION_GROUPS_REQUEST',
  GET_QUESTION_GROUPS_SUCCESS = 'GET_QUESTION_GROUPS_SUCCESS',
  GET_QUESTION_GROUPS_FAILED = 'GET_QUESTION_GROUPS_FAILED',
}

// TYPES

export type TGetQuestionGroupsRequest = {
  type: EGetQuestionGroupsAction.GET_QUESTION_GROUPS_REQUEST;
  payload: {
    materials: TGetQuestionGroupsMaterials;
    successCallback?: (response: TGetQuestionGroupsResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetQuestionGroupsSuccess = {
  type: EGetQuestionGroupsAction.GET_QUESTION_GROUPS_SUCCESS;
  payload: { response: TGetQuestionGroupsResponse };
};

export type TGetQuestionGroupsFailed = { type: EGetQuestionGroupsAction.GET_QUESTION_GROUPS_FAILED };

// FUNCTION

export const getQuestionGroupsAction = {
  request: createActionCreator(
    EGetQuestionGroupsAction.GET_QUESTION_GROUPS_REQUEST,
    (resolve) =>
      (
        materials: TGetQuestionGroupsMaterials,
        successCallback?: (response: TGetQuestionGroupsResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetQuestionGroupsRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetQuestionGroupsAction.GET_QUESTION_GROUPS_SUCCESS,
    (resolve) =>
      (response: TGetQuestionGroupsResponse): TGetQuestionGroupsSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetQuestionGroupsAction.GET_QUESTION_GROUPS_FAILED,
    (resolve) =>
      (error: unknown): TGetQuestionGroupsFailed =>
        resolve({ error }),
  ),
};
