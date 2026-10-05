import { TQuestionBankState } from '@/redux/reducers/question-bank';
import { TUpdateQuestionBankSuccess } from '@/redux/actions/question-bank';

export const updateQuestionBankUpdateState = (state: TQuestionBankState, action: TUpdateQuestionBankSuccess): TQuestionBankState => ({
  ...state,
  updateQuestionBankResponse: action.payload.response,
});
