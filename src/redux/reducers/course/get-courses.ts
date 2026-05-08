import { TCourseState } from '@/redux/reducers/course';
import { TGetCoursesSuccess } from '@/redux/actions/course';

export const getCoursesUpdateState = (state: TCourseState, action: TGetCoursesSuccess): TCourseState => ({
  ...state,
  getCoursesResponse: action.payload.response,
});
