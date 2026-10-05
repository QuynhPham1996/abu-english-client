import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { updateQuestionGroupAction } from '@/redux/actions';
import { updateQuestionGroup, TUpdateQuestionGroupResponse } from '@/services/api';

// FUNCTION

export function* updateQuestionGroupSaga(action: ActionType<typeof updateQuestionGroupAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(updateQuestionGroup, materials);
    const updateQuestionGroupResponse: TUpdateQuestionGroupResponse = response as TUpdateQuestionGroupResponse;
    yield put(updateQuestionGroupAction.success(updateQuestionGroupResponse));
    successCallback?.(updateQuestionGroupResponse);
  } catch (err) {
    yield put(updateQuestionGroupAction.failure(err));
    failedCallback?.(err);
  }
}
