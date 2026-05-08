import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { updateLessonAction } from '@/redux/actions';
import { updateLesson, TUpdateLessonResponse } from '@/services/api';

// FUNCTION

export function* updateLessonSaga(action: ActionType<typeof updateLessonAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(updateLesson, materials);
    const updateLessonResponse: TUpdateLessonResponse = response as TUpdateLessonResponse;
    yield put(updateLessonAction.success(updateLessonResponse));
    successCallback?.(updateLessonResponse);
  } catch (err) {
    yield put(updateLessonAction.failure(err));
    failedCallback?.(err);
  }
}
