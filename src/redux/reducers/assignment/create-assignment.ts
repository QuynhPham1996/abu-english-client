import { TAssignmentState } from '@/redux/reducers/assignment';
import { TCreateAssignmentSuccess } from '@/redux/actions/assignment';

export const createAssignmentUpdateState = (state: TAssignmentState, action: TCreateAssignmentSuccess): TAssignmentState => ({
  ...state,
  createAssignmentResponse: action.payload.response,
});
