import { createActionCreator } from 'deox';

import { TGetMyCoursesMaterials, TGetMyCoursesResponse } from '@/services/api/course/get-my-courses';

// CONSTANTS

export enum EGetMyCoursesAction {
  GET_MY_COURSES = 'GET_MY_COURSES',
  GET_MY_COURSES_REQUEST = 'GET_MY_COURSES_REQUEST',
  GET_MY_COURSES_SUCCESS = 'GET_MY_COURSES_SUCCESS',
  GET_MY_COURSES_FAILED = 'GET_MY_COURSES_FAILED',
}

// TYPES

export type TGetMyCoursesRequest = {
  type: EGetMyCoursesAction.GET_MY_COURSES_REQUEST;
  payload: {
    materials: TGetMyCoursesMaterials;
    successCallback?: (response: TGetMyCoursesResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetMyCoursesSuccess = {
  type: EGetMyCoursesAction.GET_MY_COURSES_SUCCESS;
  payload: { response: TGetMyCoursesResponse };
};

export type TGetMyCoursesFailed = { type: EGetMyCoursesAction.GET_MY_COURSES_FAILED };

// FUNCTION

export const getMyCoursesAction = {
  request: createActionCreator(
    EGetMyCoursesAction.GET_MY_COURSES_REQUEST,
    (resolve) =>
      (
        materials: TGetMyCoursesMaterials,
        successCallback?: (response: TGetMyCoursesResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetMyCoursesRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetMyCoursesAction.GET_MY_COURSES_SUCCESS,
    (resolve) =>
      (response: TGetMyCoursesResponse): TGetMyCoursesSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetMyCoursesAction.GET_MY_COURSES_FAILED,
    (resolve) =>
      (error: unknown): TGetMyCoursesFailed =>
        resolve({ error }),
  ),
};
