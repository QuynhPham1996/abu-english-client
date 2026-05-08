import { createActionCreator } from 'deox';

import { TGetCoursesMaterials, TGetCoursesResponse } from '@/services/api/course/get-courses';

// CONSTANTS

export enum EGetCoursesAction {
  GET_COURSES = 'GET_COURSES',
  GET_COURSES_REQUEST = 'GET_COURSES_REQUEST',
  GET_COURSES_SUCCESS = 'GET_COURSES_SUCCESS',
  GET_COURSES_FAILED = 'GET_COURSES_FAILED',
}

// TYPES

export type TGetCoursesRequest = {
  type: EGetCoursesAction.GET_COURSES_REQUEST;
  payload: {
    materials: TGetCoursesMaterials;
    successCallback?: (response: TGetCoursesResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetCoursesSuccess = {
  type: EGetCoursesAction.GET_COURSES_SUCCESS;
  payload: { response: TGetCoursesResponse };
};

export type TGetCoursesFailed = { type: EGetCoursesAction.GET_COURSES_FAILED };

// FUNCTION

export const getCoursesAction = {
  request: createActionCreator(
    EGetCoursesAction.GET_COURSES_REQUEST,
    (resolve) =>
      (
        materials: TGetCoursesMaterials,
        successCallback?: (response: TGetCoursesResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetCoursesRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetCoursesAction.GET_COURSES_SUCCESS,
    (resolve) =>
      (response: TGetCoursesResponse): TGetCoursesSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetCoursesAction.GET_COURSES_FAILED,
    (resolve) =>
      (error: unknown): TGetCoursesFailed =>
        resolve({ error }),
  ),
};
