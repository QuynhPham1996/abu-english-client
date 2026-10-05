import { TAssignmentState } from '@/redux/reducers/assignment';
import { TGetAssignmentSuccess } from '@/redux/actions/assignment';

export const getAssignmentUpdateState = (state: TAssignmentState, action: TGetAssignmentSuccess): TAssignmentState => ({
  ...state,
  getAssignmentResponse: action.payload.response,
});
