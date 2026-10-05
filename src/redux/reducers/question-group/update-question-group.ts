import { TQuestionGroupState } from '@/redux/reducers/question-group';
import { TUpdateQuestionGroupSuccess } from '@/redux/actions/question-group';

export const updateQuestionGroupUpdateState = (state: TQuestionGroupState, action: TUpdateQuestionGroupSuccess): TQuestionGroupState => ({
  ...state,
  updateQuestionGroupResponse: action.payload.response,
});
