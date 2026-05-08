import { TExerciseState } from '@/redux/reducers/exercise';
import { TUpdateExerciseSuccess } from '@/redux/actions/exercise';

export const updateExerciseUpdateState = (state: TExerciseState, action: TUpdateExerciseSuccess): TExerciseState => ({
  ...state,
  updateExerciseResponse: action.payload.response,
});
