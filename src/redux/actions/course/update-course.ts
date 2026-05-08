import { createActionCreator } from 'deox';

import { TUpdateCourseMaterials, TUpdateCourseResponse } from '@/services/api/course/update-course';

// CONSTANTS

export enum EUpdateCourseAction {
  UPDATE_COURSE = 'UPDATE_COURSE',
  UPDATE_COURSE_REQUEST = 'UPDATE_COURSE_REQUEST',
  UPDATE_COURSE_SUCCESS = 'UPDATE_COURSE_SUCCESS',
  UPDATE_COURSE_FAILED = 'UPDATE_COURSE_FAILED',
}

// TYPES

export type TUpdateCourseRequest = {
  type: EUpdateCourseAction.UPDATE_COURSE_REQUEST;
  payload: {
    materials: TUpdateCourseMaterials;
    successCallback?: (response: TUpdateCourseResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TUpdateCourseSuccess = {
  type: EUpdateCourseAction.UPDATE_COURSE_SUCCESS;
  payload: { response: TUpdateCourseResponse };
};

export type TUpdateCourseFailed = { type: EUpdateCourseAction.UPDATE_COURSE_FAILED };

// FUNCTION

export const updateCourseAction = {
  request: createActionCreator(
    EUpdateCourseAction.UPDATE_COURSE_REQUEST,
    (resolve) =>
      (
        materials: TUpdateCourseMaterials,
        successCallback?: (response: TUpdateCourseResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TUpdateCourseRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EUpdateCourseAction.UPDATE_COURSE_SUCCESS,
    (resolve) =>
      (response: TUpdateCourseResponse): TUpdateCourseSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EUpdateCourseAction.UPDATE_COURSE_FAILED,
    (resolve) =>
      (error: unknown): TUpdateCourseFailed =>
        resolve({ error }),
  ),
};
