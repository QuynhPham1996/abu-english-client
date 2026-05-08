import { createActionCreator } from 'deox';

import { TGetMyCourseLessonMaterials, TGetMyCourseLessonResponse } from '@/services/api/course/get-my-course-lesson';

// CONSTANTS

export enum EGetMyCourseLessonAction {
  GET_MY_COURSE_LESSON = 'GET_MY_COURSE_LESSON',
  GET_MY_COURSE_LESSON_REQUEST = 'GET_MY_COURSE_LESSON_REQUEST',
  GET_MY_COURSE_LESSON_SUCCESS = 'GET_MY_COURSE_LESSON_SUCCESS',
  GET_MY_COURSE_LESSON_FAILED = 'GET_MY_COURSE_LESSON_FAILED',
}

// TYPES

export type TGetMyCourseLessonRequest = {
  type: EGetMyCourseLessonAction.GET_MY_COURSE_LESSON_REQUEST;
  payload: {
    materials: TGetMyCourseLessonMaterials;
    successCallback?: (response: TGetMyCourseLessonResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetMyCourseLessonSuccess = {
  type: EGetMyCourseLessonAction.GET_MY_COURSE_LESSON_SUCCESS;
  payload: { response: TGetMyCourseLessonResponse };
};

export type TGetMyCourseLessonFailed = { type: EGetMyCourseLessonAction.GET_MY_COURSE_LESSON_FAILED };

// FUNCTION

export const getMyCourseLessonAction = {
  request: createActionCreator(
    EGetMyCourseLessonAction.GET_MY_COURSE_LESSON_REQUEST,
    (resolve) =>
      (
        materials: TGetMyCourseLessonMaterials,
        successCallback?: (response: TGetMyCourseLessonResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetMyCourseLessonRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetMyCourseLessonAction.GET_MY_COURSE_LESSON_SUCCESS,
    (resolve) =>
      (response: TGetMyCourseLessonResponse): TGetMyCourseLessonSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetMyCourseLessonAction.GET_MY_COURSE_LESSON_FAILED,
    (resolve) =>
      (error: unknown): TGetMyCourseLessonFailed =>
        resolve({ error }),
  ),
};
