import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { watchingExerciseVideoAction } from '@/redux/actions';
import { watchingExerciseVideo, TWatchingExerciseVideoResponse } from '@/services/api';

// FUNCTION

export function* watchingExerciseVideoSaga(action: ActionType<typeof watchingExerciseVideoAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(watchingExerciseVideo, materials);
    const watchingExerciseVideoResponse: TWatchingExerciseVideoResponse = response as TWatchingExerciseVideoResponse;
    yield put(watchingExerciseVideoAction.success(watchingExerciseVideoResponse));
    successCallback?.(watchingExerciseVideoResponse);
  } catch (err) {
    yield put(watchingExerciseVideoAction.failure(err));
    failedCallback?.(err);
  }
}
