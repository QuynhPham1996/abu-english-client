import { TUserState } from '@/redux/reducers/user';
import { TAddUserCoursesSuccess } from '@/redux/actions/user';

export const addUserCoursesUpdateState = (state: TUserState, action: TAddUserCoursesSuccess): TUserState => ({
  ...state,
  addUserCoursesResponse: action.payload.response,
});
