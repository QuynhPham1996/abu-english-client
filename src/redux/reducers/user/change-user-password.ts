import { TUserState } from '@/redux/reducers/user';
import { TChangeUserPasswordSuccess } from '@/redux/actions/user';

export const changeUserPasswordUpdateState = (state: TUserState, action: TChangeUserPasswordSuccess): TUserState => ({
  ...state,
  changeUserPasswordResponse: action.payload.response,
});
