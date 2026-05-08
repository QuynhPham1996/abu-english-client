import { createActionCreator } from 'deox';

import { TDeleteQuestionsMaterials, TDeleteQuestionsResponse } from '@/services/api/question/delete-questions';

// CONSTANTS

export enum EDeleteQuestionsAction {
  DELETE_QUESTIONS = 'DELETE_QUESTIONS',
  DELETE_QUESTIONS_REQUEST = 'DELETE_QUESTIONS_REQUEST',
  DELETE_QUESTIONS_SUCCESS = 'DELETE_QUESTIONS_SUCCESS',
  DELETE_QUESTIONS_FAILED = 'DELETE_QUESTIONS_FAILED',
}

// TYPES

export type TDeleteQuestionsRequest = {
  type: EDeleteQuestionsAction.DELETE_QUESTIONS_REQUEST;
  payload: {
    materials: TDeleteQuestionsMaterials;
    successCallback?: (response: TDeleteQuestionsResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TDeleteQuestionsSuccess = {
  type: EDeleteQuestionsAction.DELETE_QUESTIONS_SUCCESS;
  payload: { response: TDeleteQuestionsResponse };
};

export type TDeleteQuestionsFailed = { type: EDeleteQuestionsAction.DELETE_QUESTIONS_FAILED };

// FUNCTION

export const deleteQuestionsAction = {
  request: createActionCreator(
    EDeleteQuestionsAction.DELETE_QUESTIONS_REQUEST,
    (resolve) =>
      (
        materials: TDeleteQuestionsMaterials,
        successCallback?: (response: TDeleteQuestionsResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TDeleteQuestionsRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EDeleteQuestionsAction.DELETE_QUESTIONS_SUCCESS,
    (resolve) =>
      (response: TDeleteQuestionsResponse): TDeleteQuestionsSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EDeleteQuestionsAction.DELETE_QUESTIONS_FAILED,
    (resolve) =>
      (error: unknown): TDeleteQuestionsFailed =>
        resolve({ error }),
  ),
};
