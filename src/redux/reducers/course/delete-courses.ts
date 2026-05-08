import { TCourseState } from '@/redux/reducers/course';
import { TDeleteCoursesSuccess } from '@/redux/actions/course';

export const deleteCoursesUpdateState = (state: TCourseState, action: TDeleteCoursesSuccess): TCourseState => ({
  ...state,
  deleteCoursesResponse: action.payload.response,
});
