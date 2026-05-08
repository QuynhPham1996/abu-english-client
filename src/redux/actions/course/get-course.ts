import { createActionCreator } from 'deox';

import { TGetCourseMaterials, TGetCourseResponse } from '@/services/api/course/get-course';

// CONSTANTS

export enum EGetCourseAction {
  GET_COURSE = 'GET_COURSE',
  GET_COURSE_REQUEST = 'GET_COURSE_REQUEST',
  GET_COURSE_SUCCESS = 'GET_COURSE_SUCCESS',
  GET_COURSE_FAILED = 'GET_COURSE_FAILED',
}

// TYPES

export type TGetCourseRequest = {
  type: EGetCourseAction.GET_COURSE_REQUEST;
  payload: {
    materials: TGetCourseMaterials;
    successCallback?: (response: TGetCourseResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetCourseSuccess = {
  type: EGetCourseAction.GET_COURSE_SUCCESS;
  payload: { response: TGetCourseResponse };
};

export type TGetCourseFailed = { type: EGetCourseAction.GET_COURSE_FAILED };

// FUNCTION

export const getCourseAction = {
  request: createActionCreator(
    EGetCourseAction.GET_COURSE_REQUEST,
    (resolve) =>
      (
        materials: TGetCourseMaterials,
        successCallback?: (response: TGetCourseResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetCourseRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetCourseAction.GET_COURSE_SUCCESS,
    (resolve) =>
      (response: TGetCourseResponse): TGetCourseSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetCourseAction.GET_COURSE_FAILED,
    (resolve) =>
      (error: unknown): TGetCourseFailed =>
        resolve({ error }),
  ),
};
