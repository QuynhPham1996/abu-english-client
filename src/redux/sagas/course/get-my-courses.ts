import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getMyCoursesAction } from '@/redux/actions';
import { getMyCourses, TGetMyCoursesResponse } from '@/services/api';

// FUNCTION

export function* getMyCoursesSaga(action: ActionType<typeof getMyCoursesAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getMyCourses, materials);
    const getMyCoursesResponse: TGetMyCoursesResponse = response as TGetMyCoursesResponse;
    yield put(getMyCoursesAction.success(getMyCoursesResponse));
    successCallback?.(getMyCoursesResponse);
  } catch (err) {
    yield put(getMyCoursesAction.failure(err));
    failedCallback?.(err);
  }
}
