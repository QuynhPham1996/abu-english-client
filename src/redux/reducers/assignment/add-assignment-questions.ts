import { TAssignmentState } from '@/redux/reducers/assignment';
import { TAddAssignmentQuestionsSuccess } from '@/redux/actions/assignment';

export const addAssignmentQuestionsUpdateState = (state: TAssignmentState, action: TAddAssignmentQuestionsSuccess): TAssignmentState => ({
  ...state,
  addAssignmentQuestionsResponse: action.payload.response,
});
