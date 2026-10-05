import { TAssignmentState } from '@/redux/reducers/assignment';
import { TUpdateAssignmentQuestionsIndexSuccess } from '@/redux/actions/assignment';

export const updateAssignmentQuestionsIndexUpdateState = (state: TAssignmentState, action: TUpdateAssignmentQuestionsIndexSuccess): TAssignmentState => ({
  ...state,
  updateAssignmentQuestionsIndexResponse: action.payload.response,
});
