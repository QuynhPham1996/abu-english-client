import { createActionCreator } from 'deox';

import { TUpdateQuestionBankMaterials, TUpdateQuestionBankResponse } from '@/services/api/question-bank/update-question-bank';

// CONSTANTS

export enum EUpdateQuestionBankAction {
  UPDATE_QUESTION_BANK = 'UPDATE_QUESTION_BANK',
  UPDATE_QUESTION_BANK_REQUEST = 'UPDATE_QUESTION_BANK_REQUEST',
  UPDATE_QUESTION_BANK_SUCCESS = 'UPDATE_QUESTION_BANK_SUCCESS',
  UPDATE_QUESTION_BANK_FAILED = 'UPDATE_QUESTION_BANK_FAILED',
}

// TYPES

export type TUpdateQuestionBankRequest = {
  type: EUpdateQuestionBankAction.UPDATE_QUESTION_BANK_REQUEST;
  payload: {
    materials: TUpdateQuestionBankMaterials;
    successCallback?: (response: TUpdateQuestionBankResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TUpdateQuestionBankSuccess = {
  type: EUpdateQuestionBankAction.UPDATE_QUESTION_BANK_SUCCESS;
  payload: { response: TUpdateQuestionBankResponse };
};

export type TUpdateQuestionBankFailed = { type: EUpdateQuestionBankAction.UPDATE_QUESTION_BANK_FAILED };

// FUNCTION

export const updateQuestionBankAction = {
  request: createActionCreator(
    EUpdateQuestionBankAction.UPDATE_QUESTION_BANK_REQUEST,
    (resolve) =>
      (
        materials: TUpdateQuestionBankMaterials,
        successCallback?: (response: TUpdateQuestionBankResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TUpdateQuestionBankRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EUpdateQuestionBankAction.UPDATE_QUESTION_BANK_SUCCESS,
    (resolve) =>
      (response: TUpdateQuestionBankResponse): TUpdateQuestionBankSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EUpdateQuestionBankAction.UPDATE_QUESTION_BANK_FAILED,
    (resolve) =>
      (error: unknown): TUpdateQuestionBankFailed =>
        resolve({ error }),
  ),
};
