import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getMyCourseExerciseAction } from '@/redux/actions';
import { getMyCourseExercise, TGetMyCourseExerciseResponse } from '@/services/api';

// FUNCTION

export function* getMyCourseExerciseSaga(action: ActionType<typeof getMyCourseExerciseAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getMyCourseExercise, materials);
    const getMyCourseExerciseResponse: TGetMyCourseExerciseResponse = response as TGetMyCourseExerciseResponse;
    yield put(getMyCourseExerciseAction.success(getMyCourseExerciseResponse));
    successCallback?.(getMyCourseExerciseResponse);
  } catch (err) {
    yield put(getMyCourseExerciseAction.failure(err));
    failedCallback?.(err);
  }
}
