import { TCourseState } from '@/redux/reducers/course';
import { TGetCourseAssignmentsSuccess } from '@/redux/actions/course';

export const getCourseAssignmentsUpdateState = (
  state: TCourseState,
  action: TGetCourseAssignmentsSuccess,
): TCourseState => ({
  ...state,
  getCourseAssignmentsResponse: action.payload.response,
});
