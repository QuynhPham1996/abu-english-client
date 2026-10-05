import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getAssignmentAction } from '@/redux/actions';
import { getAssignment, TGetAssignmentResponse } from '@/services/api';

// FUNCTION

export function* getAssignmentSaga(action: ActionType<typeof getAssignmentAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getAssignment, materials);
    const getAssignmentResponse: TGetAssignmentResponse = response as TGetAssignmentResponse;
    yield put(getAssignmentAction.success(getAssignmentResponse));
    successCallback?.(getAssignmentResponse);
  } catch (err) {
    yield put(getAssignmentAction.failure(err));
    failedCallback?.(err);
  }
}
