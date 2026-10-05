import { createActionCreator } from 'deox';

import { TGetQuestionBankItemMaterials, TGetQuestionBankItemResponse } from '@/services/api/question-bank/get-question-bank-item';

// CONSTANTS

export enum EGetQuestionBankItemAction {
  GET_QUESTION_BANK_ITEM = 'GET_QUESTION_BANK_ITEM',
  GET_QUESTION_BANK_ITEM_REQUEST = 'GET_QUESTION_BANK_ITEM_REQUEST',
  GET_QUESTION_BANK_ITEM_SUCCESS = 'GET_QUESTION_BANK_ITEM_SUCCESS',
  GET_QUESTION_BANK_ITEM_FAILED = 'GET_QUESTION_BANK_ITEM_FAILED',
}

// TYPES

export type TGetQuestionBankItemRequest = {
  type: EGetQuestionBankItemAction.GET_QUESTION_BANK_ITEM_REQUEST;
  payload: {
    materials: TGetQuestionBankItemMaterials;
    successCallback?: (response: TGetQuestionBankItemResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetQuestionBankItemSuccess = {
  type: EGetQuestionBankItemAction.GET_QUESTION_BANK_ITEM_SUCCESS;
  payload: { response: TGetQuestionBankItemResponse };
};

export type TGetQuestionBankItemFailed = { type: EGetQuestionBankItemAction.GET_QUESTION_BANK_ITEM_FAILED };

// FUNCTION

export const getQuestionBankItemAction = {
  request: createActionCreator(
    EGetQuestionBankItemAction.GET_QUESTION_BANK_ITEM_REQUEST,
    (resolve) =>
      (
        materials: TGetQuestionBankItemMaterials,
        successCallback?: (response: TGetQuestionBankItemResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetQuestionBankItemRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetQuestionBankItemAction.GET_QUESTION_BANK_ITEM_SUCCESS,
    (resolve) =>
      (response: TGetQuestionBankItemResponse): TGetQuestionBankItemSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetQuestionBankItemAction.GET_QUESTION_BANK_ITEM_FAILED,
    (resolve) =>
      (error: unknown): TGetQuestionBankItemFailed =>
        resolve({ error }),
  ),
};
