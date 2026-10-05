import { TQuestionBankState } from '@/redux/reducers/question-bank';
import { TGetQuestionBankSuccess } from '@/redux/actions/question-bank';

export const getQuestionBankUpdateState = (state: TQuestionBankState, action: TGetQuestionBankSuccess): TQuestionBankState => ({
  ...state,
  getQuestionBankResponse: action.payload.response,
});
