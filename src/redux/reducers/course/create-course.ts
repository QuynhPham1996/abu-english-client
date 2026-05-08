import { TCourseState } from '@/redux/reducers/course';
import { TCreateCourseSuccess } from '@/redux/actions/course';

export const createCourseUpdateState = (state: TCourseState, action: TCreateCourseSuccess): TCourseState => ({
  ...state,
  createCourseResponse: action.payload.response,
});
