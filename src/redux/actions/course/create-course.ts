import { createActionCreator } from 'deox';

import { TCreateCourseMaterials, TCreateCourseResponse } from '@/services/api/course/create-course';

// CONSTANTS

export enum ECreateCourseAction {
  CREATE_COURSE = 'CREATE_COURSE',
  CREATE_COURSE_REQUEST = 'CREATE_COURSE_REQUEST',
  CREATE_COURSE_SUCCESS = 'CREATE_COURSE_SUCCESS',
  CREATE_COURSE_FAILED = 'CREATE_COURSE_FAILED',
}

// TYPES

export type TCreateCourseRequest = {
  type: ECreateCourseAction.CREATE_COURSE_REQUEST;
  payload: {
    materials: TCreateCourseMaterials;
    successCallback?: (response: TCreateCourseResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TCreateCourseSuccess = {
  type: ECreateCourseAction.CREATE_COURSE_SUCCESS;
  payload: { response: TCreateCourseResponse };
};

export type TCreateCourseFailed = { type: ECreateCourseAction.CREATE_COURSE_FAILED };

// FUNCTION

export const createCourseAction = {
  request: createActionCreator(
    ECreateCourseAction.CREATE_COURSE_REQUEST,
    (resolve) =>
      (
        materials: TCreateCourseMaterials,
        successCallback?: (response: TCreateCourseResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TCreateCourseRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    ECreateCourseAction.CREATE_COURSE_SUCCESS,
    (resolve) =>
      (response: TCreateCourseResponse): TCreateCourseSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    ECreateCourseAction.CREATE_COURSE_FAILED,
    (resolve) =>
      (error: unknown): TCreateCourseFailed =>
        resolve({ error }),
  ),
};
