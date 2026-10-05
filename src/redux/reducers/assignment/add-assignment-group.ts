import { TAssignmentState } from '@/redux/reducers/assignment';
import { TAddAssignmentGroupSuccess } from '@/redux/actions/assignment';

export const addAssignmentGroupUpdateState = (state: TAssignmentState, action: TAddAssignmentGroupSuccess): TAssignmentState => ({
  ...state,
  addAssignmentGroupResponse: action.payload.response,
});
