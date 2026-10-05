import { TQuestionGroupState } from '@/redux/reducers/question-group';
import { TDeleteQuestionGroupsSuccess } from '@/redux/actions/question-group';

export const deleteQuestionGroupsUpdateState = (state: TQuestionGroupState, action: TDeleteQuestionGroupsSuccess): TQuestionGroupState => ({
  ...state,
  deleteQuestionGroupsResponse: action.payload.response,
});
