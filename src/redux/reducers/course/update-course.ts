import { TCourseState } from '@/redux/reducers/course';
import { TUpdateCourseSuccess } from '@/redux/actions/course';

export const updateCourseUpdateState = (state: TCourseState, action: TUpdateCourseSuccess): TCourseState => ({
  ...state,
  updateCourseResponse: action.payload.response,
});
