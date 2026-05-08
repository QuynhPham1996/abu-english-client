import { createActionCreator } from 'deox';

import {
  TGetMyCourseExerciseMaterials,
  TGetMyCourseExerciseResponse,
} from '@/services/api/course/get-my-course-exercise';

// CONSTANTS

export enum EGetMyCourseExerciseAction {
  GET_MY_COURSE_EXERCISE = 'GET_MY_COURSE_EXERCISE',
  GET_MY_COURSE_EXERCISE_REQUEST = 'GET_MY_COURSE_EXERCISE_REQUEST',
  GET_MY_COURSE_EXERCISE_SUCCESS = 'GET_MY_COURSE_EXERCISE_SUCCESS',
  GET_MY_COURSE_EXERCISE_FAILED = 'GET_MY_COURSE_EXERCISE_FAILED',
}

// TYPES

export type TGetMyCourseExerciseRequest = {
  type: EGetMyCourseExerciseAction.GET_MY_COURSE_EXERCISE_REQUEST;
  payload: {
    materials: TGetMyCourseExerciseMaterials;
    successCallback?: (response: TGetMyCourseExerciseResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetMyCourseExerciseSuccess = {
  type: EGetMyCourseExerciseAction.GET_MY_COURSE_EXERCISE_SUCCESS;
  payload: { response: TGetMyCourseExerciseResponse };
};

export type TGetMyCourseExerciseFailed = { type: EGetMyCourseExerciseAction.GET_MY_COURSE_EXERCISE_FAILED };

// FUNCTION

export const getMyCourseExerciseAction = {
  request: createActionCreator(
    EGetMyCourseExerciseAction.GET_MY_COURSE_EXERCISE_REQUEST,
    (resolve) =>
      (
        materials: TGetMyCourseExerciseMaterials,
        successCallback?: (response: TGetMyCourseExerciseResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetMyCourseExerciseRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetMyCourseExerciseAction.GET_MY_COURSE_EXERCISE_SUCCESS,
    (resolve) =>
      (response: TGetMyCourseExerciseResponse): TGetMyCourseExerciseSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetMyCourseExerciseAction.GET_MY_COURSE_EXERCISE_FAILED,
    (resolve) =>
      (error: unknown): TGetMyCourseExerciseFailed =>
        resolve({ error }),
  ),
};
