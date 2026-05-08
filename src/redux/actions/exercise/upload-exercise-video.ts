import { createActionCreator } from 'deox';

import {
  TUploadExerciseVideoMaterials,
  TUploadExerciseVideoResponse,
} from '@/services/api/exercise/upload-exercise-video';

// CONSTANTS

export enum EUploadExerciseVideoAction {
  UPLOAD_EXERCISE_VIDEO = 'UPLOAD_EXERCISE_VIDEO',
  UPLOAD_EXERCISE_VIDEO_REQUEST = 'UPLOAD_EXERCISE_VIDEO_REQUEST',
  UPLOAD_EXERCISE_VIDEO_SUCCESS = 'UPLOAD_EXERCISE_VIDEO_SUCCESS',
  UPLOAD_EXERCISE_VIDEO_FAILED = 'UPLOAD_EXERCISE_VIDEO_FAILED',
}

// TYPES

export type TUploadExerciseVideoRequest = {
  type: EUploadExerciseVideoAction.UPLOAD_EXERCISE_VIDEO_REQUEST;
  payload: {
    materials: TUploadExerciseVideoMaterials;
    successCallback?: (response: TUploadExerciseVideoResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TUploadExerciseVideoSuccess = {
  type: EUploadExerciseVideoAction.UPLOAD_EXERCISE_VIDEO_SUCCESS;
  payload: { response: TUploadExerciseVideoResponse };
};

export type TUploadExerciseVideoFailed = { type: EUploadExerciseVideoAction.UPLOAD_EXERCISE_VIDEO_FAILED };

// FUNCTION

export const uploadExerciseVideoAction = {
  request: createActionCreator(
    EUploadExerciseVideoAction.UPLOAD_EXERCISE_VIDEO_REQUEST,
    (resolve) =>
      (
        materials: TUploadExerciseVideoMaterials,
        successCallback?: (response: TUploadExerciseVideoResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TUploadExerciseVideoRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EUploadExerciseVideoAction.UPLOAD_EXERCISE_VIDEO_SUCCESS,
    (resolve) =>
      (response: TUploadExerciseVideoResponse): TUploadExerciseVideoSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EUploadExerciseVideoAction.UPLOAD_EXERCISE_VIDEO_FAILED,
    (resolve) =>
      (error: unknown): TUploadExerciseVideoFailed =>
        resolve({ error }),
  ),
};
