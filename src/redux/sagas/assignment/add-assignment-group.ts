import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { addAssignmentGroupAction } from '@/redux/actions';
import { addAssignmentGroup, TAddAssignmentGroupResponse } from '@/services/api';

// FUNCTION

export function* addAssignmentGroupSaga(action: ActionType<typeof addAssignmentGroupAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(addAssignmentGroup, materials);
    const addAssignmentGroupResponse: TAddAssignmentGroupResponse = response as TAddAssignmentGroupResponse;
    yield put(addAssignmentGroupAction.success(addAssignmentGroupResponse));
    successCallback?.(addAssignmentGroupResponse);
  } catch (err) {
    yield put(addAssignmentGroupAction.failure(err));
    failedCallback?.(err);
  }
}
