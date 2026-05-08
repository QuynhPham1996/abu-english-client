import { createActionCreator } from 'deox';

import { TDeleteExercisesMaterials, TDeleteExercisesResponse } from '@/services/api/exercise/delete-exercises';

// CONSTANTS

export enum EDeleteExercisesAction {
  DELETE_EXERCISES = 'DELETE_EXERCISES',
  DELETE_EXERCISES_REQUEST = 'DELETE_EXERCISES_REQUEST',
  DELETE_EXERCISES_SUCCESS = 'DELETE_EXERCISES_SUCCESS',
  DELETE_EXERCISES_FAILED = 'DELETE_EXERCISES_FAILED',
}

// TYPES

export type TDeleteExercisesRequest = {
  type: EDeleteExercisesAction.DELETE_EXERCISES_REQUEST;
  payload: {
    materials: TDeleteExercisesMaterials;
    successCallback?: (response: TDeleteExercisesResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TDeleteExercisesSuccess = {
  type: EDeleteExercisesAction.DELETE_EXERCISES_SUCCESS;
  payload: { response: TDeleteExercisesResponse };
};

export type TDeleteExercisesFailed = { type: EDeleteExercisesAction.DELETE_EXERCISES_FAILED };

// FUNCTION

export const deleteExercisesAction = {
  request: createActionCreator(
    EDeleteExercisesAction.DELETE_EXERCISES_REQUEST,
    (resolve) =>
      (
        materials: TDeleteExercisesMaterials,
        successCallback?: (response: TDeleteExercisesResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TDeleteExercisesRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EDeleteExercisesAction.DELETE_EXERCISES_SUCCESS,
    (resolve) =>
      (response: TDeleteExercisesResponse): TDeleteExercisesSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EDeleteExercisesAction.DELETE_EXERCISES_FAILED,
    (resolve) =>
      (error: unknown): TDeleteExercisesFailed =>
        resolve({ error }),
  ),
};
