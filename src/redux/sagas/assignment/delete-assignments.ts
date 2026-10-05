import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { deleteAssignmentsAction } from '@/redux/actions';
import { deleteAssignments, TDeleteAssignmentsResponse } from '@/services/api';

// FUNCTION

export function* deleteAssignmentsSaga(action: ActionType<typeof deleteAssignmentsAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(deleteAssignments, materials);
    const deleteAssignmentsResponse: TDeleteAssignmentsResponse = response as TDeleteAssignmentsResponse;
    yield put(deleteAssignmentsAction.success(deleteAssignmentsResponse));
    successCallback?.(deleteAssignmentsResponse);
  } catch (err) {
    yield put(deleteAssignmentsAction.failure(err));
    failedCallback?.(err);
  }
}
