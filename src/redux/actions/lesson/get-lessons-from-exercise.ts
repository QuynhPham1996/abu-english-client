import { createActionCreator } from 'deox';

import {
  TGetLessonsFromExerciseMaterials,
  TGetLessonsFromExerciseResponse,
} from '@/services/api/lesson/get-lessons-from-exercise';

// CONSTANTS

export enum EGetLessonsFromExerciseAction {
  GET_LESSONS_FROM_EXERCISE = 'GET_LESSONS_FROM_EXERCISE',
  GET_LESSONS_FROM_EXERCISE_REQUEST = 'GET_LESSONS_FROM_EXERCISE_REQUEST',
  GET_LESSONS_FROM_EXERCISE_SUCCESS = 'GET_LESSONS_FROM_EXERCISE_SUCCESS',
  GET_LESSONS_FROM_EXERCISE_FAILED = 'GET_LESSONS_FROM_EXERCISE_FAILED',
}

// TYPES

export type TGetLessonsFromExerciseRequest = {
  type: EGetLessonsFromExerciseAction.GET_LESSONS_FROM_EXERCISE_REQUEST;
  payload: {
    materials: TGetLessonsFromExerciseMaterials;
    successCallback?: (response: TGetLessonsFromExerciseResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetLessonsFromExerciseSuccess = {
  type: EGetLessonsFromExerciseAction.GET_LESSONS_FROM_EXERCISE_SUCCESS;
  payload: { response: TGetLessonsFromExerciseResponse };
};

export type TGetLessonsFromExerciseFailed = { type: EGetLessonsFromExerciseAction.GET_LESSONS_FROM_EXERCISE_FAILED };

// FUNCTION

export const getLessonsFromExerciseAction = {
  request: createActionCreator(
    EGetLessonsFromExerciseAction.GET_LESSONS_FROM_EXERCISE_REQUEST,
    (resolve) =>
      (
        materials: TGetLessonsFromExerciseMaterials,
        successCallback?: (response: TGetLessonsFromExerciseResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetLessonsFromExerciseRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetLessonsFromExerciseAction.GET_LESSONS_FROM_EXERCISE_SUCCESS,
    (resolve) =>
      (response: TGetLessonsFromExerciseResponse): TGetLessonsFromExerciseSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetLessonsFromExerciseAction.GET_LESSONS_FROM_EXERCISE_FAILED,
    (resolve) =>
      (error: unknown): TGetLessonsFromExerciseFailed =>
        resolve({ error }),
  ),
};
