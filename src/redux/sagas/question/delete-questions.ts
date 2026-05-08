import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { deleteQuestionsAction } from '@/redux/actions';
import { deleteQuestions, TDeleteQuestionsResponse } from '@/services/api';

// FUNCTION

export function* deleteQuestionsSaga(action: ActionType<typeof deleteQuestionsAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(deleteQuestions, materials);
    const deleteQuestionsResponse: TDeleteQuestionsResponse = response as TDeleteQuestionsResponse;
    yield put(deleteQuestionsAction.success(deleteQuestionsResponse));
    successCallback?.(deleteQuestionsResponse);
  } catch (err) {
    yield put(deleteQuestionsAction.failure(err));
    failedCallback?.(err);
  }
}
