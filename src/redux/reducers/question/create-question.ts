import { TQuestionState } from '@/redux/reducers/question';
import { TCreateQuestionSuccess } from '@/redux/actions/question';

export const createQuestionUpdateState = (state: TQuestionState, action: TCreateQuestionSuccess): TQuestionState => ({
  ...state,
  createQuestionResponse: action.payload.response,
});
