import { createActionCreator } from 'deox';

import { TDeleteQuestionBankMaterials, TDeleteQuestionBankResponse } from '@/services/api/question-bank/delete-question-bank';

// CONSTANTS

export enum EDeleteQuestionBankAction {
  DELETE_QUESTION_BANK = 'DELETE_QUESTION_BANK',
  DELETE_QUESTION_BANK_REQUEST = 'DELETE_QUESTION_BANK_REQUEST',
  DELETE_QUESTION_BANK_SUCCESS = 'DELETE_QUESTION_BANK_SUCCESS',
  DELETE_QUESTION_BANK_FAILED = 'DELETE_QUESTION_BANK_FAILED',
}

// TYPES

export type TDeleteQuestionBankRequest = {
  type: EDeleteQuestionBankAction.DELETE_QUESTION_BANK_REQUEST;
  payload: {
    materials: TDeleteQuestionBankMaterials;
    successCallback?: (response: TDeleteQuestionBankResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TDeleteQuestionBankSuccess = {
  type: EDeleteQuestionBankAction.DELETE_QUESTION_BANK_SUCCESS;
  payload: { response: TDeleteQuestionBankResponse };
};

export type TDeleteQuestionBankFailed = { type: EDeleteQuestionBankAction.DELETE_QUESTION_BANK_FAILED };

// FUNCTION

export const deleteQuestionBankAction = {
  request: createActionCreator(
    EDeleteQuestionBankAction.DELETE_QUESTION_BANK_REQUEST,
    (resolve) =>
      (
        materials: TDeleteQuestionBankMaterials,
        successCallback?: (response: TDeleteQuestionBankResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TDeleteQuestionBankRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EDeleteQuestionBankAction.DELETE_QUESTION_BANK_SUCCESS,
    (resolve) =>
      (response: TDeleteQuestionBankResponse): TDeleteQuestionBankSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EDeleteQuestionBankAction.DELETE_QUESTION_BANK_FAILED,
    (resolve) =>
      (error: unknown): TDeleteQuestionBankFailed =>
        resolve({ error }),
  ),
};
