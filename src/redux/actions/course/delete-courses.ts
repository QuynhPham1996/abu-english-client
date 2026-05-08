import { createActionCreator } from 'deox';

import { TDeleteCoursesMaterials, TDeleteCoursesResponse } from '@/services/api/course/delete-courses';

// CONSTANTS

export enum EDeleteCoursesAction {
  DELETE_COURSES = 'DELETE_COURSES',
  DELETE_COURSES_REQUEST = 'DELETE_COURSES_REQUEST',
  DELETE_COURSES_SUCCESS = 'DELETE_COURSES_SUCCESS',
  DELETE_COURSES_FAILED = 'DELETE_COURSES_FAILED',
}

// TYPES

export type TDeleteCoursesRequest = {
  type: EDeleteCoursesAction.DELETE_COURSES_REQUEST;
  payload: {
    materials: TDeleteCoursesMaterials;
    successCallback?: (response: TDeleteCoursesResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TDeleteCoursesSuccess = {
  type: EDeleteCoursesAction.DELETE_COURSES_SUCCESS;
  payload: { response: TDeleteCoursesResponse };
};

export type TDeleteCoursesFailed = { type: EDeleteCoursesAction.DELETE_COURSES_FAILED };

// FUNCTION

export const deleteCoursesAction = {
  request: createActionCreator(
    EDeleteCoursesAction.DELETE_COURSES_REQUEST,
    (resolve) =>
      (
        materials: TDeleteCoursesMaterials,
        successCallback?: (response: TDeleteCoursesResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TDeleteCoursesRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EDeleteCoursesAction.DELETE_COURSES_SUCCESS,
    (resolve) =>
      (response: TDeleteCoursesResponse): TDeleteCoursesSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EDeleteCoursesAction.DELETE_COURSES_FAILED,
    (resolve) =>
      (error: unknown): TDeleteCoursesFailed =>
        resolve({ error }),
  ),
};
