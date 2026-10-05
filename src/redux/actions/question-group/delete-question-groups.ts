import { createActionCreator } from 'deox';

import { TDeleteQuestionGroupsMaterials, TDeleteQuestionGroupsResponse } from '@/services/api/question-group/delete-question-groups';

// CONSTANTS

export enum EDeleteQuestionGroupsAction {
  DELETE_QUESTION_GROUPS = 'DELETE_QUESTION_GROUPS',
  DELETE_QUESTION_GROUPS_REQUEST = 'DELETE_QUESTION_GROUPS_REQUEST',
  DELETE_QUESTION_GROUPS_SUCCESS = 'DELETE_QUESTION_GROUPS_SUCCESS',
  DELETE_QUESTION_GROUPS_FAILED = 'DELETE_QUESTION_GROUPS_FAILED',
}

// TYPES

export type TDeleteQuestionGroupsRequest = {
  type: EDeleteQuestionGroupsAction.DELETE_QUESTION_GROUPS_REQUEST;
  payload: {
    materials: TDeleteQuestionGroupsMaterials;
    successCallback?: (response: TDeleteQuestionGroupsResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TDeleteQuestionGroupsSuccess = {
  type: EDeleteQuestionGroupsAction.DELETE_QUESTION_GROUPS_SUCCESS;
  payload: { response: TDeleteQuestionGroupsResponse };
};

export type TDeleteQuestionGroupsFailed = { type: EDeleteQuestionGroupsAction.DELETE_QUESTION_GROUPS_FAILED };

// FUNCTION

export const deleteQuestionGroupsAction = {
  request: createActionCreator(
    EDeleteQuestionGroupsAction.DELETE_QUESTION_GROUPS_REQUEST,
    (resolve) =>
      (
        materials: TDeleteQuestionGroupsMaterials,
        successCallback?: (response: TDeleteQuestionGroupsResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TDeleteQuestionGroupsRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EDeleteQuestionGroupsAction.DELETE_QUESTION_GROUPS_SUCCESS,
    (resolve) =>
      (response: TDeleteQuestionGroupsResponse): TDeleteQuestionGroupsSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EDeleteQuestionGroupsAction.DELETE_QUESTION_GROUPS_FAILED,
    (resolve) =>
      (error: unknown): TDeleteQuestionGroupsFailed =>
        resolve({ error }),
  ),
};
