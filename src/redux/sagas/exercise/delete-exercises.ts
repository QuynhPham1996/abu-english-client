import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { deleteExercisesAction } from '@/redux/actions';
import { deleteExercises, TDeleteExercisesResponse } from '@/services/api';

// FUNCTION

export function* deleteExercisesSaga(action: ActionType<typeof deleteExercisesAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(deleteExercises, materials);
    const deleteExercisesResponse: TDeleteExercisesResponse = response as TDeleteExercisesResponse;
    yield put(deleteExercisesAction.success(deleteExercisesResponse));
    successCallback?.(deleteExercisesResponse);
  } catch (err) {
    yield put(deleteExercisesAction.failure(err));
    failedCallback?.(err);
  }
}
