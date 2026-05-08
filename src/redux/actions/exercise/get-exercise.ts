import { createActionCreator } from 'deox';

import { TGetExerciseMaterials, TGetExerciseResponse } from '@/services/api/exercise/get-exercise';

// CONSTANTS

export enum EGetExerciseAction {
  GET_EXERCISE = 'GET_EXERCISE',
  GET_EXERCISE_REQUEST = 'GET_EXERCISE_REQUEST',
  GET_EXERCISE_SUCCESS = 'GET_EXERCISE_SUCCESS',
  GET_EXERCISE_FAILED = 'GET_EXERCISE_FAILED',
}

// TYPES

export type TGetExerciseRequest = {
  type: EGetExerciseAction.GET_EXERCISE_REQUEST;
  payload: {
    materials: TGetExerciseMaterials;
    successCallback?: (response: TGetExerciseResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetExerciseSuccess = {
  type: EGetExerciseAction.GET_EXERCISE_SUCCESS;
  payload: { response: TGetExerciseResponse };
};

export type TGetExerciseFailed = { type: EGetExerciseAction.GET_EXERCISE_FAILED };

// FUNCTION

export const getExerciseAction = {
  request: createActionCreator(
    EGetExerciseAction.GET_EXERCISE_REQUEST,
    (resolve) =>
      (
        materials: TGetExerciseMaterials,
        successCallback?: (response: TGetExerciseResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetExerciseRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetExerciseAction.GET_EXERCISE_SUCCESS,
    (resolve) =>
      (response: TGetExerciseResponse): TGetExerciseSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetExerciseAction.GET_EXERCISE_FAILED,
    (resolve) =>
      (error: unknown): TGetExerciseFailed =>
        resolve({ error }),
  ),
};
