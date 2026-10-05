import { TExerciseState } from '@/redux/reducers/exercise';
import { TAttachExerciseAssignmentsSuccess } from '@/redux/actions/exercise';

export const attachExerciseAssignmentsUpdateState = (state: TExerciseState, action: TAttachExerciseAssignmentsSuccess): TExerciseState => ({
  ...state,
  attachExerciseAssignmentsResponse: action.payload.response,
});
