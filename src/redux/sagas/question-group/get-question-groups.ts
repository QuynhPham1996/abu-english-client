import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getQuestionGroupsAction } from '@/redux/actions';
import { getQuestionGroups, TGetQuestionGroupsResponse } from '@/services/api';

// FUNCTION

export function* getQuestionGroupsSaga(action: ActionType<typeof getQuestionGroupsAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getQuestionGroups, materials);
    const getQuestionGroupsResponse: TGetQuestionGroupsResponse = response as TGetQuestionGroupsResponse;
    yield put(getQuestionGroupsAction.success(getQuestionGroupsResponse));
    successCallback?.(getQuestionGroupsResponse);
  } catch (err) {
    yield put(getQuestionGroupsAction.failure(err));
    failedCallback?.(err);
  }
}
