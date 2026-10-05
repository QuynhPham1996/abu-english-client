import { createReducer } from 'deox';

import { TGetQuestionBankResponse, TGetQuestionBankItemResponse, TCreateQuestionBankResponse, TUpdateQuestionBankResponse, TDeleteQuestionBankResponse } from '@/services/api/question-bank';
import { getQuestionBankAction, getQuestionBankItemAction, createQuestionBankAction, updateQuestionBankAction, deleteQuestionBankAction } from '@/redux/actions';
import { getQuestionBankUpdateState } from './get-question-bank';
import { getQuestionBankItemUpdateState } from './get-question-bank-item';
import { createQuestionBankUpdateState } from './create-question-bank';
import { updateQuestionBankUpdateState } from './update-question-bank';
import { deleteQuestionBankUpdateState } from './delete-question-bank';

export type TQuestionBankState = {
  getQuestionBankResponse?: TGetQuestionBankResponse;
  getQuestionBankItemResponse?: TGetQuestionBankItemResponse;
  createQuestionBankResponse?: TCreateQuestionBankResponse;
  updateQuestionBankResponse?: TUpdateQuestionBankResponse;
  deleteQuestionBankResponse?: TDeleteQuestionBankResponse;
};

const initialState: TQuestionBankState = {
  getQuestionBankResponse: undefined,
  getQuestionBankItemResponse: undefined,
  createQuestionBankResponse: undefined,
  updateQuestionBankResponse: undefined,
  deleteQuestionBankResponse: undefined,
};

const QuestionBankReducer = createReducer(initialState, (handleAction) => [
  handleAction(getQuestionBankAction.success, getQuestionBankUpdateState),
  handleAction(getQuestionBankItemAction.success, getQuestionBankItemUpdateState),
  handleAction(createQuestionBankAction.success, createQuestionBankUpdateState),
  handleAction(updateQuestionBankAction.success, updateQuestionBankUpdateState),
  handleAction(deleteQuestionBankAction.success, deleteQuestionBankUpdateState),
]);

export default QuestionBankReducer;
