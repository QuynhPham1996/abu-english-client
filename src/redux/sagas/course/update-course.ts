import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { updateCourseAction } from '@/redux/actions';
import { updateCourse, TUpdateCourseResponse } from '@/services/api';

// FUNCTION

export function* updateCourseSaga(action: ActionType<typeof updateCourseAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(updateCourse, materials);
    const updateCourseResponse: TUpdateCourseResponse = response as TUpdateCourseResponse;
    yield put(updateCourseAction.success(updateCourseResponse));
    successCallback?.(updateCourseResponse);
  } catch (err) {
    yield put(updateCourseAction.failure(err));
    failedCallback?.(err);
  }
}
