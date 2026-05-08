import { TCourseState } from '@/redux/reducers/course';
import { TRegisterCourseSuccess } from '@/redux/actions/course';

export const registerCourseUpdateState = (state: TCourseState, action: TRegisterCourseSuccess): TCourseState => ({
  ...state,
  registerCourseResponse: action.payload.response,
});
