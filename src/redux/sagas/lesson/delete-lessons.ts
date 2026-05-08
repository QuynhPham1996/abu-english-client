import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { deleteLessonsAction } from '@/redux/actions';
import { deleteLessons, TDeleteLessonsResponse } from '@/services/api';

// FUNCTION

export function* deleteLessonsSaga(action: ActionType<typeof deleteLessonsAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(deleteLessons, materials);
    const deleteLessonsResponse: TDeleteLessonsResponse = response as TDeleteLessonsResponse;
    yield put(deleteLessonsAction.success(deleteLessonsResponse));
    successCallback?.(deleteLessonsResponse);
  } catch (err) {
    yield put(deleteLessonsAction.failure(err));
    failedCallback?.(err);
  }
}
