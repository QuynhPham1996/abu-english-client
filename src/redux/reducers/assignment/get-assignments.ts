import { TAssignmentState } from '@/redux/reducers/assignment';
import { TGetAssignmentsSuccess } from '@/redux/actions/assignment';

export const getAssignmentsUpdateState = (state: TAssignmentState, action: TGetAssignmentsSuccess): TAssignmentState => ({
  ...state,
  getAssignmentsResponse: action.payload.response,
});
