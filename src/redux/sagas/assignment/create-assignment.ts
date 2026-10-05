import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { createAssignmentAction } from '@/redux/actions';
import { createAssignment, TCreateAssignmentResponse } from '@/services/api';

// FUNCTION

export function* createAssignmentSaga(action: ActionType<typeof createAssignmentAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(createAssignment, materials);
    const createAssignmentResponse: TCreateAssignmentResponse = response as TCreateAssignmentResponse;
    yield put(createAssignmentAction.success(createAssignmentResponse));
    successCallback?.(createAssignmentResponse);
  } catch (err) {
    yield put(createAssignmentAction.failure(err));
    failedCallback?.(err);
  }
}
