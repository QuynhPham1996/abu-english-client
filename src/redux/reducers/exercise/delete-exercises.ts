import { TExerciseState } from '@/redux/reducers/exercise';
import { TDeleteExercisesSuccess } from '@/redux/actions/exercise';

export const deleteExercisesUpdateState = (state: TExerciseState, action: TDeleteExercisesSuccess): TExerciseState => ({
  ...state,
  deleteExercisesResponse: action.payload.response,
});
