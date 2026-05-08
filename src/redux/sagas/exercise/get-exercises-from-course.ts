import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { getExercisesFromCourseAction } from '@/redux/actions';
import { getExercisesFromCourse, TGetExercisesFromCourseResponse } from '@/services/api';

// FUNCTION

export function* getExercisesFromCourseSaga(
  action: ActionType<typeof getExercisesFromCourseAction.request>,
): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(getExercisesFromCourse, materials);
    const getExercisesFromCourseResponse: TGetExercisesFromCourseResponse = response as TGetExercisesFromCourseResponse;
    yield put(getExercisesFromCourseAction.success(getExercisesFromCourseResponse));
    successCallback?.(getExercisesFromCourseResponse);
  } catch (err) {
    yield put(getExercisesFromCourseAction.failure(err));
    failedCallback?.(err);
  }
}
