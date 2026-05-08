import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { createLessonAction } from '@/redux/actions';
import { createLesson, TCreateLessonResponse } from '@/services/api';

// FUNCTION

export function* createLessonSaga(action: ActionType<typeof createLessonAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(createLesson, materials);
    const createLessonResponse: TCreateLessonResponse = response as TCreateLessonResponse;
    yield put(createLessonAction.success(createLessonResponse));
    successCallback?.(createLessonResponse);
  } catch (err) {
    yield put(createLessonAction.failure(err));
    failedCallback?.(err);
  }
}
