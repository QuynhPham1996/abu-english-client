import { createReducer } from 'deox';

import { TLoginResponse, TLogoutResponse } from '@/services/api/auth';
import { loginAction, logoutAction } from '@/redux/actions';
import { loginUpdateState } from './login';
import { logoutUpdateState } from './logout';

export type TAuthState = {
  loginResponse?: TLoginResponse;
  logoutResponse?: TLogoutResponse;
};

const initialState: TAuthState = {
  loginResponse: undefined,
  logoutResponse: undefined,
};

const AuthReducer = createReducer(initialState, (handleAction) => [
  handleAction(loginAction.success, loginUpdateState),
  handleAction(logoutAction.success, logoutUpdateState),
]);

export default AuthReducer;
