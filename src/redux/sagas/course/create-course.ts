import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { createCourseAction } from '@/redux/actions';
import { createCourse, TCreateCourseResponse } from '@/services/api';

// FUNCTION

export function* createCourseSaga(action: ActionType<typeof createCourseAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(createCourse, materials);
    const createCourseResponse: TCreateCourseResponse = response as TCreateCourseResponse;
    yield put(createCourseAction.success(createCourseResponse));
    successCallback?.(createCourseResponse);
  } catch (err) {
    yield put(createCourseAction.failure(err));
    failedCallback?.(err);
  }
}
