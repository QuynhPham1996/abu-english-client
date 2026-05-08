import { createActionCreator } from 'deox';

import {
  TGetExercisesFromCourseMaterials,
  TGetExercisesFromCourseResponse,
} from '@/services/api/exercise/get-exercises-from-course';

// CONSTANTS

export enum EGetExercisesFromCourseAction {
  GET_EXERCISES_FROM_COURSE = 'GET_EXERCISES_FROM_COURSE',
  GET_EXERCISES_FROM_COURSE_REQUEST = 'GET_EXERCISES_FROM_COURSE_REQUEST',
  GET_EXERCISES_FROM_COURSE_SUCCESS = 'GET_EXERCISES_FROM_COURSE_SUCCESS',
  GET_EXERCISES_FROM_COURSE_FAILED = 'GET_EXERCISES_FROM_COURSE_FAILED',
}

// TYPES

export type TGetExercisesFromCourseRequest = {
  type: EGetExercisesFromCourseAction.GET_EXERCISES_FROM_COURSE_REQUEST;
  payload: {
    materials: TGetExercisesFromCourseMaterials;
    successCallback?: (response: TGetExercisesFromCourseResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetExercisesFromCourseSuccess = {
  type: EGetExercisesFromCourseAction.GET_EXERCISES_FROM_COURSE_SUCCESS;
  payload: { response: TGetExercisesFromCourseResponse };
};

export type TGetExercisesFromCourseFailed = { type: EGetExercisesFromCourseAction.GET_EXERCISES_FROM_COURSE_FAILED };

// FUNCTION

export const getExercisesFromCourseAction = {
  request: createActionCreator(
    EGetExercisesFromCourseAction.GET_EXERCISES_FROM_COURSE_REQUEST,
    (resolve) =>
      (
        materials: TGetExercisesFromCourseMaterials,
        successCallback?: (response: TGetExercisesFromCourseResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetExercisesFromCourseRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetExercisesFromCourseAction.GET_EXERCISES_FROM_COURSE_SUCCESS,
    (resolve) =>
      (response: TGetExercisesFromCourseResponse): TGetExercisesFromCourseSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetExercisesFromCourseAction.GET_EXERCISES_FROM_COURSE_FAILED,
    (resolve) =>
      (error: unknown): TGetExercisesFromCourseFailed =>
        resolve({ error }),
  ),
};
