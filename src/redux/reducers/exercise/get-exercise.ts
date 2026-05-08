import { TExerciseState } from '@/redux/reducers/exercise';
import { TGetExerciseSuccess } from '@/redux/actions/exercise';

export const getExerciseUpdateState = (state: TExerciseState, action: TGetExerciseSuccess): TExerciseState => ({
  ...state,
  getExerciseResponse: action.payload.response,
});
