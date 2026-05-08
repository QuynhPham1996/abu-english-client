import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { deleteUsersAction } from '@/redux/actions';
import { deleteUsers, TDeleteUsersResponse } from '@/services/api';

// FUNCTION

export function* deleteUsersSaga(action: ActionType<typeof deleteUsersAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(deleteUsers, materials);
    const deleteUsersResponse: TDeleteUsersResponse = response as TDeleteUsersResponse;
    yield put(deleteUsersAction.success(deleteUsersResponse));
    successCallback?.(deleteUsersResponse);
  } catch (err) {
    yield put(deleteUsersAction.failure(err));
    failedCallback?.(err);
  }
}
