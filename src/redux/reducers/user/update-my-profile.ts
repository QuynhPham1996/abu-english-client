import { TUserState } from '@/redux/reducers/user';
import { TUpdateMyProfileSuccess } from '@/redux/actions/user';

export const updateMyProfileUpdateState = (state: TUserState, action: TUpdateMyProfileSuccess): TUserState => ({
  ...state,
  updateMyProfileResponse: action.payload.response,
});
