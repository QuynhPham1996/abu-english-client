import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { updateExerciseAction } from '@/redux/actions';
import { updateExercise, TUpdateExerciseResponse } from '@/services/api';

// FUNCTION

export function* updateExerciseSaga(action: ActionType<typeof updateExerciseAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(updateExercise, materials);
    const updateExerciseResponse: TUpdateExerciseResponse = response as TUpdateExerciseResponse;
    yield put(updateExerciseAction.success(updateExerciseResponse));
    successCallback?.(updateExerciseResponse);
  } catch (err) {
    yield put(updateExerciseAction.failure(err));
    failedCallback?.(err);
  }
}
