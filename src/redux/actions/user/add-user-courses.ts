import { createActionCreator } from 'deox';

import { TAddUserCoursesMaterials, TAddUserCoursesResponse } from '@/services/api/user/add-user-courses';

// CONSTANTS

export enum EAddUserCoursesAction {
  ADD_USER_COURSES = 'ADD_USER_COURSES',
  ADD_USER_COURSES_REQUEST = 'ADD_USER_COURSES_REQUEST',
  ADD_USER_COURSES_SUCCESS = 'ADD_USER_COURSES_SUCCESS',
  ADD_USER_COURSES_FAILED = 'ADD_USER_COURSES_FAILED',
}

// TYPES

export type TAddUserCoursesRequest = {
  type: EAddUserCoursesAction.ADD_USER_COURSES_REQUEST;
  payload: {
    materials: TAddUserCoursesMaterials;
    successCallback?: (response: TAddUserCoursesResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TAddUserCoursesSuccess = {
  type: EAddUserCoursesAction.ADD_USER_COURSES_SUCCESS;
  payload: { response: TAddUserCoursesResponse };
};

export type TAddUserCoursesFailed = { type: EAddUserCoursesAction.ADD_USER_COURSES_FAILED };

// FUNCTION

export const addUserCoursesAction = {
  request: createActionCreator(
    EAddUserCoursesAction.ADD_USER_COURSES_REQUEST,
    (resolve) =>
      (
        materials: TAddUserCoursesMaterials,
        successCallback?: (response: TAddUserCoursesResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TAddUserCoursesRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EAddUserCoursesAction.ADD_USER_COURSES_SUCCESS,
    (resolve) =>
      (response: TAddUserCoursesResponse): TAddUserCoursesSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EAddUserCoursesAction.ADD_USER_COURSES_FAILED,
    (resolve) =>
      (error: unknown): TAddUserCoursesFailed =>
        resolve({ error }),
  ),
};
