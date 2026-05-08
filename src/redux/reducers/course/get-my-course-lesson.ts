import { TCourseState } from '@/redux/reducers/course';
import { TGetMyCourseLessonSuccess } from '@/redux/actions/course';

export const getMyCourseLessonUpdateState = (state: TCourseState, action: TGetMyCourseLessonSuccess): TCourseState => ({
  ...state,
  getMyCourseLessonResponse: action.payload.response,
});
