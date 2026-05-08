import { TExerciseState } from '@/redux/reducers/exercise';
import { TGetExercisesFromCourseSuccess } from '@/redux/actions/exercise';

export const getExercisesFromCourseUpdateState = (
  state: TExerciseState,
  action: TGetExercisesFromCourseSuccess,
): TExerciseState => ({
  ...state,
  getExercisesFromCourseResponse: action.payload.response,
});
