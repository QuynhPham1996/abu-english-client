import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getLessonsFromExerciseAction } from '@/redux/actions';
import { getLessonsFromExercise, TGetLessonsFromExerciseResponse } from '@/services/api';

// FUNCTION

export function* getLessonsFromExerciseSaga(
  action: ActionType<typeof getLessonsFromExerciseAction.request>,
): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getLessonsFromExercise, materials);
    const getLessonsFromExerciseResponse: TGetLessonsFromExerciseResponse = response as TGetLessonsFromExerciseResponse;
    yield put(getLessonsFromExerciseAction.success(getLessonsFromExerciseResponse));
    successCallback?.(getLessonsFromExerciseResponse);
  } catch (err) {
    yield put(getLessonsFromExerciseAction.failure(err));
    failedCallback?.(err);
  }
}
