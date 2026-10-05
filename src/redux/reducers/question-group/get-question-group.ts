import { TQuestionGroupState } from '@/redux/reducers/question-group';
import { TGetQuestionGroupSuccess } from '@/redux/actions/question-group';

export const getQuestionGroupUpdateState = (state: TQuestionGroupState, action: TGetQuestionGroupSuccess): TQuestionGroupState => ({
  ...state,
  getQuestionGroupResponse: action.payload.response,
});
