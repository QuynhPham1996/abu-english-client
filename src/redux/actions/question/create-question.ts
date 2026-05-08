import { createActionCreator } from 'deox';

import { TCreateQuestionMaterials, TCreateQuestionResponse } from '@/services/api/question/create-question';

// CONSTANTS

export enum ECreateQuestionAction {
  CREATE_QUESTION = 'CREATE_QUESTION',
  CREATE_QUESTION_REQUEST = 'CREATE_QUESTION_REQUEST',
  CREATE_QUESTION_SUCCESS = 'CREATE_QUESTION_SUCCESS',
  CREATE_QUESTION_FAILED = 'CREATE_QUESTION_FAILED',
}

// TYPES

export type TCreateQuestionRequest = {
  type: ECreateQuestionAction.CREATE_QUESTION_REQUEST;
  payload: {
    materials: TCreateQuestionMaterials;
    successCallback?: (response: TCreateQuestionResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TCreateQuestionSuccess = {
  type: ECreateQuestionAction.CREATE_QUESTION_SUCCESS;
  payload: { response: TCreateQuestionResponse };
};

export type TCreateQuestionFailed = { type: ECreateQuestionAction.CREATE_QUESTION_FAILED };

// FUNCTION

export const createQuestionAction = {
  request: createActionCreator(
    ECreateQuestionAction.CREATE_QUESTION_REQUEST,
    (resolve) =>
      (
        materials: TCreateQuestionMaterials,
        successCallback?: (response: TCreateQuestionResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TCreateQuestionRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    ECreateQuestionAction.CREATE_QUESTION_SUCCESS,
    (resolve) =>
      (response: TCreateQuestionResponse): TCreateQuestionSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    ECreateQuestionAction.CREATE_QUESTION_FAILED,
    (resolve) =>
      (error: unknown): TCreateQuestionFailed =>
        resolve({ error }),
  ),
};
