import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getAssignmentsAction } from '@/redux/actions';
import { getAssignments, TGetAssignmentsResponse } from '@/services/api';

// FUNCTION

export function* getAssignmentsSaga(action: ActionType<typeof getAssignmentsAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getAssignments, materials);
    const getAssignmentsResponse: TGetAssignmentsResponse = response as TGetAssignmentsResponse;
    yield put(getAssignmentsAction.success(getAssignmentsResponse));
    successCallback?.(getAssignmentsResponse);
  } catch (err) {
    yield put(getAssignmentsAction.failure(err));
    failedCallback?.(err);
  }
}
