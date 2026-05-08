import { TUserState } from '@/redux/reducers/user';
import { TChangeMyProfilePasswordSuccess } from '@/redux/actions/user';

export const changeMyProfilePasswordUpdateState = (
  state: TUserState,
  action: TChangeMyProfilePasswordSuccess,
): TUserState => ({
  ...state,
  changeMyProfilePasswordResponse: action.payload.response,
});
