import { TQuestionBankState } from '@/redux/reducers/question-bank';
import { TDeleteQuestionBankSuccess } from '@/redux/actions/question-bank';

export const deleteQuestionBankUpdateState = (state: TQuestionBankState, action: TDeleteQuestionBankSuccess): TQuestionBankState => ({
  ...state,
  deleteQuestionBankResponse: action.payload.response,
});
