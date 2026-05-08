import { createActionCreator } from 'deox';

import { TGetPublicCoursesMaterials, TGetPublicCoursesResponse } from '@/services/api/public/get-public-courses';

// CONSTANTS

export enum EGetPublicCoursesAction {
  GET_PUBLIC_COURSES = 'GET_PUBLIC_COURSES',
  GET_PUBLIC_COURSES_REQUEST = 'GET_PUBLIC_COURSES_REQUEST',
  GET_PUBLIC_COURSES_SUCCESS = 'GET_PUBLIC_COURSES_SUCCESS',
  GET_PUBLIC_COURSES_FAILED = 'GET_PUBLIC_COURSES_FAILED',
}

// TYPES

export type TGetPublicCoursesRequest = {
  type: EGetPublicCoursesAction.GET_PUBLIC_COURSES_REQUEST;
  payload: {
    materials: TGetPublicCoursesMaterials;
    successCallback?: (response: TGetPublicCoursesResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetPublicCoursesSuccess = {
  type: EGetPublicCoursesAction.GET_PUBLIC_COURSES_SUCCESS;
  payload: { response: TGetPublicCoursesResponse };
};

export type TGetPublicCoursesFailed = { type: EGetPublicCoursesAction.GET_PUBLIC_COURSES_FAILED };

// FUNCTION

export const getPublicCoursesAction = {
  request: createActionCreator(
    EGetPublicCoursesAction.GET_PUBLIC_COURSES_REQUEST,
    (resolve) =>
      (
        materials: TGetPublicCoursesMaterials,
        successCallback?: (response: TGetPublicCoursesResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetPublicCoursesRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetPublicCoursesAction.GET_PUBLIC_COURSES_SUCCESS,
    (resolve) =>
      (response: TGetPublicCoursesResponse): TGetPublicCoursesSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetPublicCoursesAction.GET_PUBLIC_COURSES_FAILED,
    (resolve) =>
      (error: unknown): TGetPublicCoursesFailed =>
        resolve({ error }),
  ),
};
