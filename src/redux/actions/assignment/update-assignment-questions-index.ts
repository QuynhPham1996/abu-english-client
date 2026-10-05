import { createActionCreator } from 'deox';

import { TUpdateAssignmentQuestionsIndexMaterials, TUpdateAssignmentQuestionsIndexResponse } from '@/services/api/assignment/update-assignment-questions-index';

// CONSTANTS

export enum EUpdateAssignmentQuestionsIndexAction {
  UPDATE_ASSIGNMENT_QUESTIONS_INDEX = 'UPDATE_ASSIGNMENT_QUESTIONS_INDEX',
  UPDATE_ASSIGNMENT_QUESTIONS_INDEX_REQUEST = 'UPDATE_ASSIGNMENT_QUESTIONS_INDEX_REQUEST',
  UPDATE_ASSIGNMENT_QUESTIONS_INDEX_SUCCESS = 'UPDATE_ASSIGNMENT_QUESTIONS_INDEX_SUCCESS',
  UPDATE_ASSIGNMENT_QUESTIONS_INDEX_FAILED = 'UPDATE_ASSIGNMENT_QUESTIONS_INDEX_FAILED',
}

// TYPES

export type TUpdateAssignmentQuestionsIndexRequest = {
  type: EUpdateAssignmentQuestionsIndexAction.UPDATE_ASSIGNMENT_QUESTIONS_INDEX_REQUEST;
  payload: {
    materials: TUpdateAssignmentQuestionsIndexMaterials;
    successCallback?: (response: TUpdateAssignmentQuestionsIndexResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TUpdateAssignmentQuestionsIndexSuccess = {
  type: EUpdateAssignmentQuestionsIndexAction.UPDATE_ASSIGNMENT_QUESTIONS_INDEX_SUCCESS;
  payload: { response: TUpdateAssignmentQuestionsIndexResponse };
};

export type TUpdateAssignmentQuestionsIndexFailed = { type: EUpdateAssignmentQuestionsIndexAction.UPDATE_ASSIGNMENT_QUESTIONS_INDEX_FAILED };

// FUNCTION

export const updateAssignmentQuestionsIndexAction = {
  request: createActionCreator(
    EUpdateAssignmentQuestionsIndexAction.UPDATE_ASSIGNMENT_QUESTIONS_INDEX_REQUEST,
    (resolve) =>
      (
        materials: TUpdateAssignmentQuestionsIndexMaterials,
        successCallback?: (response: TUpdateAssignmentQuestionsIndexResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TUpdateAssignmentQuestionsIndexRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EUpdateAssignmentQuestionsIndexAction.UPDATE_ASSIGNMENT_QUESTIONS_INDEX_SUCCESS,
    (resolve) =>
      (response: TUpdateAssignmentQuestionsIndexResponse): TUpdateAssignmentQuestionsIndexSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EUpdateAssignmentQuestionsIndexAction.UPDATE_ASSIGNMENT_QUESTIONS_INDEX_FAILED,
    (resolve) =>
      (error: unknown): TUpdateAssignmentQuestionsIndexFailed =>
        resolve({ error }),
  ),
};
