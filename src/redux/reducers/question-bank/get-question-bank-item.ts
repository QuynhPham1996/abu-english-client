import { TQuestionBankState } from '@/redux/reducers/question-bank';
import { TGetQuestionBankItemSuccess } from '@/redux/actions/question-bank';

export const getQuestionBankItemUpdateState = (state: TQuestionBankState, action: TGetQuestionBankItemSuccess): TQuestionBankState => ({
  ...state,
  getQuestionBankItemResponse: action.payload.response,
});
