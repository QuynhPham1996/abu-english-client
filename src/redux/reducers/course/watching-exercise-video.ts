import { TCourseState } from '@/redux/reducers/course';
import { TWatchingExerciseVideoSuccess } from '@/redux/actions/course';

export const watchingExerciseVideoUpdateState = (
  state: TCourseState,
  action: TWatchingExerciseVideoSuccess,
): TCourseState => ({
  ...state,
  watchingExerciseVideoResponse: action.payload.response,
});
