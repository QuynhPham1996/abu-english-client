import { TExerciseState } from '@/redux/reducers/exercise';
import { TUploadExerciseVideoSuccess } from '@/redux/actions/exercise';

export const uploadExerciseVideoUpdateState = (
  state: TExerciseState,
  action: TUploadExerciseVideoSuccess,
): TExerciseState => ({
  ...state,
  uploadExerciseVideoResponse: action.payload.response,
});
