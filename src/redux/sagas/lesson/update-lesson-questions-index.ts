import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { updateLessonQuestionsIndexAction } from '@/redux/actions';
import { updateLessonQuestionsIndex, TUpdateLessonQuestionsIndexResponse } from '@/services/api';

// FUNCTION

export function* updateLessonQuestionsIndexSaga(
  action: ActionType<typeof updateLessonQuestionsIndexAction.request>,
): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(updateLessonQuestionsIndex, materials);
    const updateLessonQuestionsIndexResponse: TUpdateLessonQuestionsIndexResponse =
      response as TUpdateLessonQuestionsIndexResponse;
    yield put(updateLessonQuestionsIndexAction.success(updateLessonQuestionsIndexResponse));
    successCallback?.(updateLessonQuestionsIndexResponse);
  } catch (err) {
    yield put(updateLessonQuestionsIndexAction.failure(err));
    failedCallback?.(err);
  }
}
