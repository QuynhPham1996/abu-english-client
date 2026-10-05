import { TCourseState } from '@/redux/reducers/course';
import { TAttachCourseAssignmentsSuccess } from '@/redux/actions/course';

export const attachCourseAssignmentsUpdateState = (
  state: TCourseState,
  action: TAttachCourseAssignmentsSuccess,
): TCourseState => ({
  ...state,
  attachCourseAssignmentsResponse: action.payload.response,
});
