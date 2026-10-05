import { TAssignmentState } from '@/redux/reducers/assignment';
import { TUpdateAssignmentSuccess } from '@/redux/actions/assignment';

export const updateAssignmentUpdateState = (state: TAssignmentState, action: TUpdateAssignmentSuccess): TAssignmentState => ({
  ...state,
  updateAssignmentResponse: action.payload.response,
});
