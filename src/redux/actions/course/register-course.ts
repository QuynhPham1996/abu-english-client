import { createActionCreator } from 'deox';

import { TRegisterCourseMaterials, TRegisterCourseResponse } from '@/services/api/course/register-course';

// CONSTANTS

export enum ERegisterCourseAction {
  REGISTER_COURSE = 'REGISTER_COURSE',
  REGISTER_COURSE_REQUEST = 'REGISTER_COURSE_REQUEST',
  REGISTER_COURSE_SUCCESS = 'REGISTER_COURSE_SUCCESS',
  REGISTER_COURSE_FAILED = 'REGISTER_COURSE_FAILED',
}

// TYPES

export type TRegisterCourseRequest = {
  type: ERegisterCourseAction.REGISTER_COURSE_REQUEST;
  payload: {
    materials: TRegisterCourseMaterials;
    successCallback?: (response: TRegisterCourseResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TRegisterCourseSuccess = {
  type: ERegisterCourseAction.REGISTER_COURSE_SUCCESS;
  payload: { response: TRegisterCourseResponse };
};

export type TRegisterCourseFailed = { type: ERegisterCourseAction.REGISTER_COURSE_FAILED };

// FUNCTION

export const registerCourseAction = {
  request: createActionCreator(
    ERegisterCourseAction.REGISTER_COURSE_REQUEST,
    (resolve) =>
      (
        materials: TRegisterCourseMaterials,
        successCallback?: (response: TRegisterCourseResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TRegisterCourseRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    ERegisterCourseAction.REGISTER_COURSE_SUCCESS,
    (resolve) =>
      (response: TRegisterCourseResponse): TRegisterCourseSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    ERegisterCourseAction.REGISTER_COURSE_FAILED,
    (resolve) =>
      (error: unknown): TRegisterCourseFailed =>
        resolve({ error }),
  ),
};
