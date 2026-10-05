import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { deleteQuestionGroupsAction } from '@/redux/actions';
import { deleteQuestionGroups, TDeleteQuestionGroupsResponse } from '@/services/api';

// FUNCTION

export function* deleteQuestionGroupsSaga(action: ActionType<typeof deleteQuestionGroupsAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(deleteQuestionGroups, materials);
    const deleteQuestionGroupsResponse: TDeleteQuestionGroupsResponse = response as TDeleteQuestionGroupsResponse;
    yield put(deleteQuestionGroupsAction.success(deleteQuestionGroupsResponse));
    successCallback?.(deleteQuestionGroupsResponse);
  } catch (err) {
    yield put(deleteQuestionGroupsAction.failure(err));
    failedCallback?.(err);
  }
}
