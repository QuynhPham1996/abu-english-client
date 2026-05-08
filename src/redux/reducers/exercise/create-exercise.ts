import { TExerciseState } from '@/redux/reducers/exercise';
import { TCreateExerciseSuccess } from '@/redux/actions/exercise';

export const createExerciseUpdateState = (state: TExerciseState, action: TCreateExerciseSuccess): TExerciseState => ({
  ...state,
  createExerciseResponse: action.payload.response,
});
