import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getMyCourseLessonAction } from '@/redux/actions';
import { getMyCourseLesson, TGetMyCourseLessonResponse } from '@/services/api';

// FUNCTION

export function* getMyCourseLessonSaga(action: ActionType<typeof getMyCourseLessonAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getMyCourseLesson, materials);
    const getMyCourseLessonResponse: TGetMyCourseLessonResponse = response as TGetMyCourseLessonResponse;
    yield put(getMyCourseLessonAction.success(getMyCourseLessonResponse));
    successCallback?.(getMyCourseLessonResponse);
  } catch (err) {
    yield put(getMyCourseLessonAction.failure(err));
    failedCallback?.(err);
  }
}
