import { createActionCreator } from 'deox';

import { TUpdateLessonMaterials, TUpdateLessonResponse } from '@/services/api/lesson/update-lesson';

// CONSTANTS

export enum EUpdateLessonAction {
  UPDATE_LESSON = 'UPDATE_LESSON',
  UPDATE_LESSON_REQUEST = 'UPDATE_LESSON_REQUEST',
  UPDATE_LESSON_SUCCESS = 'UPDATE_LESSON_SUCCESS',
  UPDATE_LESSON_FAILED = 'UPDATE_LESSON_FAILED',
}

// TYPES

export type TUpdateLessonRequest = {
  type: EUpdateLessonAction.UPDATE_LESSON_REQUEST;
  payload: {
    materials: TUpdateLessonMaterials;
    successCallback?: (response: TUpdateLessonResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TUpdateLessonSuccess = {
  type: EUpdateLessonAction.UPDATE_LESSON_SUCCESS;
  payload: { response: TUpdateLessonResponse };
};

export type TUpdateLessonFailed = { type: EUpdateLessonAction.UPDATE_LESSON_FAILED };

// FUNCTION

export const updateLessonAction = {
  request: createActionCreator(
    EUpdateLessonAction.UPDATE_LESSON_REQUEST,
    (resolve) =>
      (
        materials: TUpdateLessonMaterials,
        successCallback?: (response: TUpdateLessonResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TUpdateLessonRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EUpdateLessonAction.UPDATE_LESSON_SUCCESS,
    (resolve) =>
      (response: TUpdateLessonResponse): TUpdateLessonSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EUpdateLessonAction.UPDATE_LESSON_FAILED,
    (resolve) =>
      (error: unknown): TUpdateLessonFailed =>
        resolve({ error }),
  ),
};
