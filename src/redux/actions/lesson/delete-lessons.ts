import { createActionCreator } from 'deox';

import { TDeleteLessonsMaterials, TDeleteLessonsResponse } from '@/services/api/lesson/delete-lessons';

// CONSTANTS

export enum EDeleteLessonsAction {
  DELETE_LESSONS = 'DELETE_LESSONS',
  DELETE_LESSONS_REQUEST = 'DELETE_LESSONS_REQUEST',
  DELETE_LESSONS_SUCCESS = 'DELETE_LESSONS_SUCCESS',
  DELETE_LESSONS_FAILED = 'DELETE_LESSONS_FAILED',
}

// TYPES

export type TDeleteLessonsRequest = {
  type: EDeleteLessonsAction.DELETE_LESSONS_REQUEST;
  payload: {
    materials: TDeleteLessonsMaterials;
    successCallback?: (response: TDeleteLessonsResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TDeleteLessonsSuccess = {
  type: EDeleteLessonsAction.DELETE_LESSONS_SUCCESS;
  payload: { response: TDeleteLessonsResponse };
};

export type TDeleteLessonsFailed = { type: EDeleteLessonsAction.DELETE_LESSONS_FAILED };

// FUNCTION

export const deleteLessonsAction = {
  request: createActionCreator(
    EDeleteLessonsAction.DELETE_LESSONS_REQUEST,
    (resolve) =>
      (
        materials: TDeleteLessonsMaterials,
        successCallback?: (response: TDeleteLessonsResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TDeleteLessonsRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EDeleteLessonsAction.DELETE_LESSONS_SUCCESS,
    (resolve) =>
      (response: TDeleteLessonsResponse): TDeleteLessonsSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EDeleteLessonsAction.DELETE_LESSONS_FAILED,
    (resolve) =>
      (error: unknown): TDeleteLessonsFailed =>
        resolve({ error }),
  ),
};
