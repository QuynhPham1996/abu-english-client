import { TUserState } from '@/redux/reducers/user';
import { TDeleteUsersSuccess } from '@/redux/actions/user';

export const deleteUsersUpdateState = (state: TUserState, action: TDeleteUsersSuccess): TUserState => ({
  ...state,
  deleteUsersResponse: action.payload.response,
});
