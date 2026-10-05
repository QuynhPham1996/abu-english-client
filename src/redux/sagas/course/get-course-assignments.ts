import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getCourseAssignmentsAction } from '@/redux/actions';
import { getCourseAssignments, TGetCourseAssignmentsResponse } from '@/services/api';

export function* getCourseAssignmentsSaga(action: ActionType<typeof getCourseAssignmentsAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getCourseAssignments, materials);
    const getCourseAssignmentsResponse: TGetCourseAssignmentsResponse = response as TGetCourseAssignmentsResponse;
    yield put(getCourseAssignmentsAction.success(getCourseAssignmentsResponse));
    successCallback?.(getCourseAssignmentsResponse);
  } catch (err) {
    yield put(getCourseAssignmentsAction.failure(err));
    failedCallback?.(err);
  }
}
