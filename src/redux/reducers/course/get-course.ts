import { TCourseState } from '@/redux/reducers/course';
import { TGetCourseSuccess } from '@/redux/actions/course';

export const getCourseUpdateState = (state: TCourseState, action: TGetCourseSuccess): TCourseState => ({
  ...state,
  getCourseResponse: action.payload.response,
});
