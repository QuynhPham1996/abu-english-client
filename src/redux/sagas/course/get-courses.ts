import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getCoursesAction } from '@/redux/actions';
import { getCourses, TGetCoursesResponse } from '@/services/api';

// FUNCTION

export function* getCoursesSaga(action: ActionType<typeof getCoursesAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getCourses, materials);
    const getCoursesResponse: TGetCoursesResponse = response as TGetCoursesResponse;
    yield put(getCoursesAction.success(getCoursesResponse));
    successCallback?.(getCoursesResponse);
  } catch (err) {
    yield put(getCoursesAction.failure(err));
    failedCallback?.(err);
  }
}
