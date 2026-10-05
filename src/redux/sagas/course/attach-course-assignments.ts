import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { attachCourseAssignmentsAction } from '@/redux/actions';
import { attachCourseAssignments, TAttachCourseAssignmentsResponse } from '@/services/api';

export function* attachCourseAssignmentsSaga(
  action: ActionType<typeof attachCourseAssignmentsAction.request>,
): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(attachCourseAssignments, materials);
    const attachCourseAssignmentsResponse: TAttachCourseAssignmentsResponse =
      response as TAttachCourseAssignmentsResponse;
    yield put(attachCourseAssignmentsAction.success(attachCourseAssignmentsResponse));
    successCallback?.(attachCourseAssignmentsResponse);
  } catch (err) {
    yield put(attachCourseAssignmentsAction.failure(err));
    failedCallback?.(err);
  }
}
