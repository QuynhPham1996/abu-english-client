import { createActionCreator } from 'deox';

import {
  TWatchingExerciseVideoMaterials,
  TWatchingExerciseVideoResponse,
} from '@/services/api/course/watching-exercise-video';

// CONSTANTS

export enum EWatchingExerciseVideoAction {
  WATCHING_EXERCISE_VIDEO = 'WATCHING_EXERCISE_VIDEO',
  WATCHING_EXERCISE_VIDEO_REQUEST = 'WATCHING_EXERCISE_VIDEO_REQUEST',
  WATCHING_EXERCISE_VIDEO_SUCCESS = 'WATCHING_EXERCISE_VIDEO_SUCCESS',
  WATCHING_EXERCISE_VIDEO_FAILED = 'WATCHING_EXERCISE_VIDEO_FAILED',
}

// TYPES

export type TWatchingExerciseVideoRequest = {
  type: EWatchingExerciseVideoAction.WATCHING_EXERCISE_VIDEO_REQUEST;
  payload: {
    materials: TWatchingExerciseVideoMaterials;
    successCallback?: (response: TWatchingExerciseVideoResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TWatchingExerciseVideoSuccess = {
  type: EWatchingExerciseVideoAction.WATCHING_EXERCISE_VIDEO_SUCCESS;
  payload: { response: TWatchingExerciseVideoResponse };
};

export type TWatchingExerciseVideoFailed = { type: EWatchingExerciseVideoAction.WATCHING_EXERCISE_VIDEO_FAILED };

// FUNCTION

export const watchingExerciseVideoAction = {
  request: createActionCreator(
    EWatchingExerciseVideoAction.WATCHING_EXERCISE_VIDEO_REQUEST,
    (resolve) =>
      (
        materials: TWatchingExerciseVideoMaterials,
        successCallback?: (response: TWatchingExerciseVideoResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TWatchingExerciseVideoRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EWatchingExerciseVideoAction.WATCHING_EXERCISE_VIDEO_SUCCESS,
    (resolve) =>
      (response: TWatchingExerciseVideoResponse): TWatchingExerciseVideoSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EWatchingExerciseVideoAction.WATCHING_EXERCISE_VIDEO_FAILED,
    (resolve) =>
      (error: unknown): TWatchingExerciseVideoFailed =>
        resolve({ error }),
  ),
};
