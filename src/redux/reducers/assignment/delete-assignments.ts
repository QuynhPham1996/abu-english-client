import { TAssignmentState } from '@/redux/reducers/assignment';
import { TDeleteAssignmentsSuccess } from '@/redux/actions/assignment';

export const deleteAssignmentsUpdateState = (state: TAssignmentState, action: TDeleteAssignmentsSuccess): TAssignmentState => ({
  ...state,
  deleteAssignmentsResponse: action.payload.response,
});
