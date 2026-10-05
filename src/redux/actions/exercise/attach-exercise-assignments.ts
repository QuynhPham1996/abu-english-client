import { createActionCreator } from 'deox';

import { TAttachExerciseAssignmentsMaterials, TAttachExerciseAssignmentsResponse } from '@/services/api/exercise/attach-exercise-assignments';

// CONSTANTS

export enum EAttachExerciseAssignmentsAction {
  ATTACH_EXERCISE_ASSIGNMENTS = 'ATTACH_EXERCISE_ASSIGNMENTS',
  ATTACH_EXERCISE_ASSIGNMENTS_REQUEST = 'ATTACH_EXERCISE_ASSIGNMENTS_REQUEST',
  ATTACH_EXERCISE_ASSIGNMENTS_SUCCESS = 'ATTACH_EXERCISE_ASSIGNMENTS_SUCCESS',
  ATTACH_EXERCISE_ASSIGNMENTS_FAILED = 'ATTACH_EXERCISE_ASSIGNMENTS_FAILED',
}

// TYPES

export type TAttachExerciseAssignmentsRequest = {
  type: EAttachExerciseAssignmentsAction.ATTACH_EXERCISE_ASSIGNMENTS_REQUEST;
  payload: {
    materials: TAttachExerciseAssignmentsMaterials;
    successCallback?: (response: TAttachExerciseAssignmentsResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TAttachExerciseAssignmentsSuccess = {
  type: EAttachExerciseAssignmentsAction.ATTACH_EXERCISE_ASSIGNMENTS_SUCCESS;
  payload: { response: TAttachExerciseAssignmentsResponse };
};

export type TAttachExerciseAssignmentsFailed = { type: EAttachExerciseAssignmentsAction.ATTACH_EXERCISE_ASSIGNMENTS_FAILED };

// FUNCTION

export const attachExerciseAssignmentsAction = {
  request: createActionCreator(
    EAttachExerciseAssignmentsAction.ATTACH_EXERCISE_ASSIGNMENTS_REQUEST,
    (resolve) =>
      (
        materials: TAttachExerciseAssignmentsMaterials,
        successCallback?: (response: TAttachExerciseAssignmentsResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TAttachExerciseAssignmentsRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EAttachExerciseAssignmentsAction.ATTACH_EXERCISE_ASSIGNMENTS_SUCCESS,
    (resolve) =>
      (response: TAttachExerciseAssignmentsResponse): TAttachExerciseAssignmentsSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EAttachExerciseAssignmentsAction.ATTACH_EXERCISE_ASSIGNMENTS_FAILED,
    (resolve) =>
      (error: unknown): TAttachExerciseAssignmentsFailed =>
        resolve({ error }),
  ),
};
