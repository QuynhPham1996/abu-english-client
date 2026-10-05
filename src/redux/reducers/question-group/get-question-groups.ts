import { TQuestionGroupState } from '@/redux/reducers/question-group';
import { TGetQuestionGroupsSuccess } from '@/redux/actions/question-group';

export const getQuestionGroupsUpdateState = (state: TQuestionGroupState, action: TGetQuestionGroupsSuccess): TQuestionGroupState => ({
  ...state,
  getQuestionGroupsResponse: action.payload.response,
});
