import { createActionCreator } from 'deox';

import { TUpdateQuestionMaterials, TUpdateQuestionResponse } from '@/services/api/question/update-question';

// CONSTANTS

export enum EUpdateQuestionAction {
  UPDATE_QUESTION = 'UPDATE_QUESTION',
  UPDATE_QUESTION_REQUEST = 'UPDATE_QUESTION_REQUEST',
  UPDATE_QUESTION_SUCCESS = 'UPDATE_QUESTION_SUCCESS',
  UPDATE_QUESTION_FAILED = 'UPDATE_QUESTION_FAILED',
}

// TYPES

export type TUpdateQuestionRequest = {
  type: EUpdateQuestionAction.UPDATE_QUESTION_REQUEST;
  payload: {
    materials: TUpdateQuestionMaterials;
    successCallback?: (response: TUpdateQuestionResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TUpdateQuestionSuccess = {
  type: EUpdateQuestionAction.UPDATE_QUESTION_SUCCESS;
  payload: { response: TUpdateQuestionResponse };
};

export type TUpdateQuestionFailed = { type: EUpdateQuestionAction.UPDATE_QUESTION_FAILED };

// FUNCTION

export const updateQuestionAction = {
  request: createActionCreator(
    EUpdateQuestionAction.UPDATE_QUESTION_REQUEST,
    (resolve) =>
      (
        materials: TUpdateQuestionMaterials,
        successCallback?: (response: TUpdateQuestionResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TUpdateQuestionRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EUpdateQuestionAction.UPDATE_QUESTION_SUCCESS,
    (resolve) =>
      (response: TUpdateQuestionResponse): TUpdateQuestionSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EUpdateQuestionAction.UPDATE_QUESTION_FAILED,
    (resolve) =>
      (error: unknown): TUpdateQuestionFailed =>
        resolve({ error }),
  ),
};
