import { createActionCreator } from 'deox';

import { TCreateExerciseMaterials, TCreateExerciseResponse } from '@/services/api/exercise/create-exercise';

// CONSTANTS

export enum ECreateExerciseAction {
  CREATE_EXERCISE = 'CREATE_EXERCISE',
  CREATE_EXERCISE_REQUEST = 'CREATE_EXERCISE_REQUEST',
  CREATE_EXERCISE_SUCCESS = 'CREATE_EXERCISE_SUCCESS',
  CREATE_EXERCISE_FAILED = 'CREATE_EXERCISE_FAILED',
}

// TYPES

export type TCreateExerciseRequest = {
  type: ECreateExerciseAction.CREATE_EXERCISE_REQUEST;
  payload: {
    materials: TCreateExerciseMaterials;
    successCallback?: (response: TCreateExerciseResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TCreateExerciseSuccess = {
  type: ECreateExerciseAction.CREATE_EXERCISE_SUCCESS;
  payload: { response: TCreateExerciseResponse };
};

export type TCreateExerciseFailed = { type: ECreateExerciseAction.CREATE_EXERCISE_FAILED };

// FUNCTION

export const createExerciseAction = {
  request: createActionCreator(
    ECreateExerciseAction.CREATE_EXERCISE_REQUEST,
    (resolve) =>
      (
        materials: TCreateExerciseMaterials,
        successCallback?: (response: TCreateExerciseResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TCreateExerciseRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    ECreateExerciseAction.CREATE_EXERCISE_SUCCESS,
    (resolve) =>
      (response: TCreateExerciseResponse): TCreateExerciseSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    ECreateExerciseAction.CREATE_EXERCISE_FAILED,
    (resolve) =>
      (error: unknown): TCreateExerciseFailed =>
        resolve({ error }),
  ),
};
