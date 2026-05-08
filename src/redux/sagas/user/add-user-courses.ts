import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { addUserCoursesAction } from '@/redux/actions';
import { addUserCourses, TAddUserCoursesResponse } from '@/services/api';

// FUNCTION

export function* addUserCoursesSaga(action: ActionType<typeof addUserCoursesAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(addUserCourses, materials);
    const addUserCoursesResponse: TAddUserCoursesResponse = response as TAddUserCoursesResponse;
    yield put(addUserCoursesAction.success(addUserCoursesResponse));
    successCallback?.(addUserCoursesResponse);
  } catch (err) {
    yield put(addUserCoursesAction.failure(err));
    failedCallback?.(err);
  }
}
