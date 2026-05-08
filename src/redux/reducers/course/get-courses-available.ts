import { TCourseState } from '@/redux/reducers/course';
import { TGetCoursesAvailableSuccess } from '@/redux/actions/course';

export const getCoursesAvailableUpdateState = (
  state: TCourseState,
  action: TGetCoursesAvailableSuccess,
): TCourseState => ({
  ...state,
  getCoursesAvailableResponse: action.payload.response,
});
