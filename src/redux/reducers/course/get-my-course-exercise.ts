import { TCourseState } from '@/redux/reducers/course';
import { TGetMyCourseExerciseSuccess } from '@/redux/actions/course';

export const getMyCourseExerciseUpdateState = (
  state: TCourseState,
  action: TGetMyCourseExerciseSuccess,
): TCourseState => ({
  ...state,
  getMyCourseExerciseResponse: action.payload.response,
});
