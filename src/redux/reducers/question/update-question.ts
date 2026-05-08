import { TQuestionState } from '@/redux/reducers/question';
import { TUpdateQuestionSuccess } from '@/redux/actions/question';

export const updateQuestionUpdateState = (state: TQuestionState, action: TUpdateQuestionSuccess): TQuestionState => ({
  ...state,
  updateQuestionResponse: action.payload.response,
});
