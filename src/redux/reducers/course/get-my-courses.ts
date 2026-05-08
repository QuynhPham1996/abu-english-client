import { TCourseState } from '@/redux/reducers/course';
import { TGetMyCoursesSuccess } from '@/redux/actions/course';

export const getMyCoursesUpdateState = (state: TCourseState, action: TGetMyCoursesSuccess): TCourseState => ({
  ...state,
  getMyCoursesResponse: action.payload.response,
});
