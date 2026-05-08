import { TQuestionState } from '@/redux/reducers/question';
import { TDeleteQuestionsSuccess } from '@/redux/actions/question';

export const deleteQuestionsUpdateState = (state: TQuestionState, action: TDeleteQuestionsSuccess): TQuestionState => ({
  ...state,
  deleteQuestionsResponse: action.payload.response,
});
