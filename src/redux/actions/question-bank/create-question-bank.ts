import { createActionCreator } from 'deox';

import { TCreateQuestionBankMaterials, TCreateQuestionBankResponse } from '@/services/api/question-bank/create-question-bank';

// CONSTANTS

export enum ECreateQuestionBankAction {
  CREATE_QUESTION_BANK = 'CREATE_QUESTION_BANK',
  CREATE_QUESTION_BANK_REQUEST = 'CREATE_QUESTION_BANK_REQUEST',
  CREATE_QUESTION_BANK_SUCCESS = 'CREATE_QUESTION_BANK_SUCCESS',
  CREATE_QUESTION_BANK_FAILED = 'CREATE_QUESTION_BANK_FAILED',
}

// TYPES

export type TCreateQuestionBankRequest = {
  type: ECreateQuestionBankAction.CREATE_QUESTION_BANK_REQUEST;
  payload: {
    materials: TCreateQuestionBankMaterials;
    successCallback?: (response: TCreateQuestionBankResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TCreateQuestionBankSuccess = {
  type: ECreateQuestionBankAction.CREATE_QUESTION_BANK_SUCCESS;
  payload: { response: TCreateQuestionBankResponse };
};

export type TCreateQuestionBankFailed = { type: ECreateQuestionBankAction.CREATE_QUESTION_BANK_FAILED };

// FUNCTION

export const createQuestionBankAction = {
  request: createActionCreator(
    ECreateQuestionBankAction.CREATE_QUESTION_BANK_REQUEST,
    (resolve) =>
      (
        materials: TCreateQuestionBankMaterials,
        successCallback?: (response: TCreateQuestionBankResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TCreateQuestionBankRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    ECreateQuestionBankAction.CREATE_QUESTION_BANK_SUCCESS,
    (resolve) =>
      (response: TCreateQuestionBankResponse): TCreateQuestionBankSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    ECreateQuestionBankAction.CREATE_QUESTION_BANK_FAILED,
    (resolve) =>
      (error: unknown): TCreateQuestionBankFailed =>
        resolve({ error }),
  ),
};
