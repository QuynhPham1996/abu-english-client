import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { addAssignmentQuestionsAction } from '@/redux/actions';
import { addAssignmentQuestions, TAddAssignmentQuestionsResponse } from '@/services/api';

// FUNCTION

export function* addAssignmentQuestionsSaga(action: ActionType<typeof addAssignmentQuestionsAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(addAssignmentQuestions, materials);
    const addAssignmentQuestionsResponse: TAddAssignmentQuestionsResponse = response as TAddAssignmentQuestionsResponse;
    yield put(addAssignmentQuestionsAction.success(addAssignmentQuestionsResponse));
    successCallback?.(addAssignmentQuestionsResponse);
  } catch (err) {
    yield put(addAssignmentQuestionsAction.failure(err));
    failedCallback?.(err);
  }
}
