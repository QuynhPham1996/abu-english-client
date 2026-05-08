import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { deleteCoursesAction } from '@/redux/actions';
import { deleteCourses, TDeleteCoursesResponse } from '@/services/api';

// FUNCTION

export function* deleteCoursesSaga(action: ActionType<typeof deleteCoursesAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(deleteCourses, materials);
    const deleteCoursesResponse: TDeleteCoursesResponse = response as TDeleteCoursesResponse;
    yield put(deleteCoursesAction.success(deleteCoursesResponse));
    successCallback?.(deleteCoursesResponse);
  } catch (err) {
    yield put(deleteCoursesAction.failure(err));
    failedCallback?.(err);
  }
}
