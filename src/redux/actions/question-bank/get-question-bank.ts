import { createActionCreator } from 'deox';

import { TGetQuestionBankMaterials, TGetQuestionBankResponse } from '@/services/api/question-bank/get-question-bank';

// CONSTANTS

export enum EGetQuestionBankAction {
  GET_QUESTION_BANK = 'GET_QUESTION_BANK',
  GET_QUESTION_BANK_REQUEST = 'GET_QUESTION_BANK_REQUEST',
  GET_QUESTION_BANK_SUCCESS = 'GET_QUESTION_BANK_SUCCESS',
  GET_QUESTION_BANK_FAILED = 'GET_QUESTION_BANK_FAILED',
}

// TYPES

export type TGetQuestionBankRequest = {
  type: EGetQuestionBankAction.GET_QUESTION_BANK_REQUEST;
  payload: {
    materials: TGetQuestionBankMaterials;
    successCallback?: (response: TGetQuestionBankResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetQuestionBankSuccess = {
  type: EGetQuestionBankAction.GET_QUESTION_BANK_SUCCESS;
  payload: { response: TGetQuestionBankResponse };
};

export type TGetQuestionBankFailed = { type: EGetQuestionBankAction.GET_QUESTION_BANK_FAILED };

// FUNCTION

export const getQuestionBankAction = {
  request: createActionCreator(
    EGetQuestionBankAction.GET_QUESTION_BANK_REQUEST,
    (resolve) =>
      (
        materials: TGetQuestionBankMaterials,
        successCallback?: (response: TGetQuestionBankResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetQuestionBankRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetQuestionBankAction.GET_QUESTION_BANK_SUCCESS,
    (resolve) =>
      (response: TGetQuestionBankResponse): TGetQuestionBankSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetQuestionBankAction.GET_QUESTION_BANK_FAILED,
    (resolve) =>
      (error: unknown): TGetQuestionBankFailed =>
        resolve({ error }),
  ),
};
