import { TAuthState } from '@/redux/reducers/auth';
import { TLogoutSuccess } from '@/redux/actions/auth';

export const logoutUpdateState = (state: TAuthState, action: TLogoutSuccess): TAuthState => ({
  ...state,
  logoutResponse: action.payload.response,
});
