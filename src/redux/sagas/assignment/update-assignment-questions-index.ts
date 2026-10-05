import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { updateAssignmentQuestionsIndexAction } from '@/redux/actions';
import { updateAssignmentQuestionsIndex, TUpdateAssignmentQuestionsIndexResponse } from '@/services/api';

// FUNCTION

export function* updateAssignmentQuestionsIndexSaga(action: ActionType<typeof updateAssignmentQuestionsIndexAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(updateAssignmentQuestionsIndex, materials);
    const updateAssignmentQuestionsIndexResponse: TUpdateAssignmentQuestionsIndexResponse = response as TUpdateAssignmentQuestionsIndexResponse;
    yield put(updateAssignmentQuestionsIndexAction.success(updateAssignmentQuestionsIndexResponse));
    successCallback?.(updateAssignmentQuestionsIndexResponse);
  } catch (err) {
    yield put(updateAssignmentQuestionsIndexAction.failure(err));
    failedCallback?.(err);
  }
}
