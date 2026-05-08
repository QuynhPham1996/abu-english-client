import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getCoursesAvailableAction } from '@/redux/actions';
import { getCoursesAvailable, TGetCoursesAvailableResponse } from '@/services/api';

// FUNCTION

export function* getCoursesAvailableSaga(action: ActionType<typeof getCoursesAvailableAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getCoursesAvailable, materials);
    const getCoursesAvailableResponse: TGetCoursesAvailableResponse = response as TGetCoursesAvailableResponse;
    yield put(getCoursesAvailableAction.success(getCoursesAvailableResponse));
    successCallback?.(getCoursesAvailableResponse);
  } catch (err) {
    yield put(getCoursesAvailableAction.failure(err));
    failedCallback?.(err);
  }
}
