import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getExerciseAction } from '@/redux/actions';
import { getExercise, TGetExerciseResponse } from '@/services/api';

// FUNCTION

export function* getExerciseSaga(action: ActionType<typeof getExerciseAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getExercise, materials);
    const getExerciseResponse: TGetExerciseResponse = response as TGetExerciseResponse;
    yield put(getExerciseAction.success(getExerciseResponse));
    successCallback?.(getExerciseResponse);
  } catch (err) {
    yield put(getExerciseAction.failure(err));
    failedCallback?.(err);
  }
}
