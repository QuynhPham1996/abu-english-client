import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { uploadExerciseVideoAction } from '@/redux/actions';
import { uploadExerciseVideo, TUploadExerciseVideoResponse } from '@/services/api';

// FUNCTION

export function* uploadExerciseVideoSaga(action: ActionType<typeof uploadExerciseVideoAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(uploadExerciseVideo, materials);
    const uploadExerciseVideoResponse: TUploadExerciseVideoResponse = response as TUploadExerciseVideoResponse;
    yield put(uploadExerciseVideoAction.success(uploadExerciseVideoResponse));
    successCallback?.(uploadExerciseVideoResponse);
  } catch (err) {
    yield put(uploadExerciseVideoAction.failure(err));
    failedCallback?.(err);
  }
}
