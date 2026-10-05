import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getQuestionGroupAction } from '@/redux/actions';
import { getQuestionGroup, TGetQuestionGroupResponse } from '@/services/api';

// FUNCTION

export function* getQuestionGroupSaga(action: ActionType<typeof getQuestionGroupAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getQuestionGroup, materials);
    const getQuestionGroupResponse: TGetQuestionGroupResponse = response as TGetQuestionGroupResponse;
    yield put(getQuestionGroupAction.success(getQuestionGroupResponse));
    successCallback?.(getQuestionGroupResponse);
  } catch (err) {
    yield put(getQuestionGroupAction.failure(err));
    failedCallback?.(err);
  }
}
