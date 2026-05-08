import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { registerCourseAction } from '@/redux/actions';
import { registerCourse, TRegisterCourseResponse } from '@/services/api';

// FUNCTION

export function* registerCourseSaga(action: ActionType<typeof registerCourseAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(registerCourse, materials);
    const registerCourseResponse: TRegisterCourseResponse = response as TRegisterCourseResponse;
    yield put(registerCourseAction.success(registerCourseResponse));
    successCallback?.(registerCourseResponse);
  } catch (err) {
    yield put(registerCourseAction.failure(err));
    failedCallback?.(err);
  }
}
