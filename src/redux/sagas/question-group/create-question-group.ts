import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { createQuestionGroupAction } from '@/redux/actions';
import { createQuestionGroup, TCreateQuestionGroupResponse } from '@/services/api';

// FUNCTION

export function* createQuestionGroupSaga(action: ActionType<typeof createQuestionGroupAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(createQuestionGroup, materials);
    const createQuestionGroupResponse: TCreateQuestionGroupResponse = response as TCreateQuestionGroupResponse;
    yield put(createQuestionGroupAction.success(createQuestionGroupResponse));
    successCallback?.(createQuestionGroupResponse);
  } catch (err) {
    yield put(createQuestionGroupAction.failure(err));
    failedCallback?.(err);
  }
}
