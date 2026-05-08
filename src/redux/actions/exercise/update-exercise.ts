import { createActionCreator } from 'deox';

import { TUpdateExerciseMaterials, TUpdateExerciseResponse } from '@/services/api/exercise/update-exercise';

// CONSTANTS

export enum EUpdateExerciseAction {
  UPDATE_EXERCISE = 'UPDATE_EXERCISE',
  UPDATE_EXERCISE_REQUEST = 'UPDATE_EXERCISE_REQUEST',
  UPDATE_EXERCISE_SUCCESS = 'UPDATE_EXERCISE_SUCCESS',
  UPDATE_EXERCISE_FAILED = 'UPDATE_EXERCISE_FAILED',
}

// TYPES

export type TUpdateExerciseRequest = {
  type: EUpdateExerciseAction.UPDATE_EXERCISE_REQUEST;
  payload: {
    materials: TUpdateExerciseMaterials;
    successCallback?: (response: TUpdateExerciseResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TUpdateExerciseSuccess = {
  type: EUpdateExerciseAction.UPDATE_EXERCISE_SUCCESS;
  payload: { response: TUpdateExerciseResponse };
};

export type TUpdateExerciseFailed = { type: EUpdateExerciseAction.UPDATE_EXERCISE_FAILED };

// FUNCTION

export const updateExerciseAction = {
  request: createActionCreator(
    EUpdateExerciseAction.UPDATE_EXERCISE_REQUEST,
    (resolve) =>
      (
        materials: TUpdateExerciseMaterials,
        successCallback?: (response: TUpdateExerciseResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TUpdateExerciseRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EUpdateExerciseAction.UPDATE_EXERCISE_SUCCESS,
    (resolve) =>
      (response: TUpdateExerciseResponse): TUpdateExerciseSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EUpdateExerciseAction.UPDATE_EXERCISE_FAILED,
    (resolve) =>
      (error: unknown): TUpdateExerciseFailed =>
        resolve({ error }),
  ),
};
