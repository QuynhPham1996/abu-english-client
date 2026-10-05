import { TQuestionGroupState } from '@/redux/reducers/question-group';
import { TCreateQuestionGroupSuccess } from '@/redux/actions/question-group';

export const createQuestionGroupUpdateState = (state: TQuestionGroupState, action: TCreateQuestionGroupSuccess): TQuestionGroupState => ({
  ...state,
  createQuestionGroupResponse: action.payload.response,
});
