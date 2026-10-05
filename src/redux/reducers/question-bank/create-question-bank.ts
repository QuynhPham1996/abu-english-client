import { TQuestionBankState } from '@/redux/reducers/question-bank';
import { TCreateQuestionBankSuccess } from '@/redux/actions/question-bank';

export const createQuestionBankUpdateState = (state: TQuestionBankState, action: TCreateQuestionBankSuccess): TQuestionBankState => ({
  ...state,
  createQuestionBankResponse: action.payload.response,
});
