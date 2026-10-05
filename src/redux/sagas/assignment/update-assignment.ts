import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { updateAssignmentAction } from '@/redux/actions';
import { updateAssignment, TUpdateAssignmentResponse } from '@/services/api';

// FUNCTION

export function* updateAssignmentSaga(action: ActionType<typeof updateAssignmentAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(updateAssignment, materials);
    const updateAssignmentResponse: TUpdateAssignmentResponse = response as TUpdateAssignmentResponse;
    yield put(updateAssignmentAction.success(updateAssignmentResponse));
    successCallback?.(updateAssignmentResponse);
  } catch (err) {
    yield put(updateAssignmentAction.failure(err));
    failedCallback?.(err);
  }
}
