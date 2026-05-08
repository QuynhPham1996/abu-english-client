import { all, takeLatest } from 'redux-saga/effects';

import { loginAction, logoutAction } from '@/redux/actions';

import { loginSaga } from './login';
import { logoutSaga } from './logout';

export default function* root(): Generator {
  yield all([takeLatest(loginAction.request.type, loginSaga), takeLatest(logoutAction.request.type, logoutSaga)]);
}
