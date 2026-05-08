import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getPublicCoursesAction } from '@/redux/actions';
import { getPublicCourses, TGetPublicCoursesResponse } from '@/services/api';

// FUNCTION

export function* getPublicCoursesSaga(action: ActionType<typeof getPublicCoursesAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getPublicCourses, materials);
    const getPublicCoursesResponse: TGetPublicCoursesResponse = response as TGetPublicCoursesResponse;
    yield put(getPublicCoursesAction.success(getPublicCoursesResponse));
    successCallback?.(getPublicCoursesResponse);
  } catch (err) {
    yield put(getPublicCoursesAction.failure(err));
    failedCallback?.(err);
  }
}
