import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { attachExerciseAssignmentsAction } from '@/redux/actions';
import { attachExerciseAssignments, TAttachExerciseAssignmentsResponse } from '@/services/api';

// FUNCTION

export function* attachExerciseAssignmentsSaga(action: ActionType<typeof attachExerciseAssignmentsAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(attachExerciseAssignments, materials);
    const attachExerciseAssignmentsResponse: TAttachExerciseAssignmentsResponse = response as TAttachExerciseAssignmentsResponse;
    yield put(attachExerciseAssignmentsAction.success(attachExerciseAssignmentsResponse));
    successCallback?.(attachExerciseAssignmentsResponse);
  } catch (err) {
    yield put(attachExerciseAssignmentsAction.failure(err));
    failedCallback?.(err);
  }
}
