import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { createExerciseAction } from '@/redux/actions';
import { createExercise, TCreateExerciseResponse } from '@/services/api';

// FUNCTION

export function* createExerciseSaga(action: ActionType<typeof createExerciseAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(createExercise, materials);
    const createExerciseResponse: TCreateExerciseResponse = response as TCreateExerciseResponse;
    yield put(createExerciseAction.success(createExerciseResponse));
    successCallback?.(createExerciseResponse);
  } catch (err) {
    yield put(createExerciseAction.failure(err));
    failedCallback?.(err);
  }
}
