import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { addLessonQuestionsAction } from '@/redux/actions';
import { addLessonQuestions, TAddLessonQuestionsResponse } from '@/services/api';

// FUNCTION

export function* addLessonQuestionsSaga(action: ActionType<typeof addLessonQuestionsAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(addLessonQuestions, materials);
    const addLessonQuestionsResponse: TAddLessonQuestionsResponse = response as TAddLessonQuestionsResponse;
    yield put(addLessonQuestionsAction.success(addLessonQuestionsResponse));
    successCallback?.(addLessonQuestionsResponse);
  } catch (err) {
    yield put(addLessonQuestionsAction.failure(err));
    failedCallback?.(err);
  }
}
