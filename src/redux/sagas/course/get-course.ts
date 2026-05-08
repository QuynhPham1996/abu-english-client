import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getCourseAction } from '@/redux/actions';
import { getCourse, TGetCourseResponse } from '@/services/api';

// FUNCTION

export function* getCourseSaga(action: ActionType<typeof getCourseAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getCourse, materials);
    const getCourseResponse: TGetCourseResponse = response as TGetCourseResponse;
    yield put(getCourseAction.success(getCourseResponse));
    successCallback?.(getCourseResponse);
  } catch (err) {
    yield put(getCourseAction.failure(err));
    failedCallback?.(err);
  }
}
