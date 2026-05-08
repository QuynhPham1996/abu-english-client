import { createActionCreator } from 'deox';

import { TCreateLessonMaterials, TCreateLessonResponse } from '@/services/api/lesson/create-lesson';

// CONSTANTS

export enum ECreateLessonAction {
  CREATE_LESSON = 'CREATE_LESSON',
  CREATE_LESSON_REQUEST = 'CREATE_LESSON_REQUEST',
  CREATE_LESSON_SUCCESS = 'CREATE_LESSON_SUCCESS',
  CREATE_LESSON_FAILED = 'CREATE_LESSON_FAILED',
}

// TYPES

export type TCreateLessonRequest = {
  type: ECreateLessonAction.CREATE_LESSON_REQUEST;
  payload: {
    materials: TCreateLessonMaterials;
    successCallback?: (response: TCreateLessonResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TCreateLessonSuccess = {
  type: ECreateLessonAction.CREATE_LESSON_SUCCESS;
  payload: { response: TCreateLessonResponse };
};

export type TCreateLessonFailed = { type: ECreateLessonAction.CREATE_LESSON_FAILED };

// FUNCTION

export const createLessonAction = {
  request: createActionCreator(
    ECreateLessonAction.CREATE_LESSON_REQUEST,
    (resolve) =>
      (
        materials: TCreateLessonMaterials,
        successCallback?: (response: TCreateLessonResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TCreateLessonRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    ECreateLessonAction.CREATE_LESSON_SUCCESS,
    (resolve) =>
      (response: TCreateLessonResponse): TCreateLessonSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    ECreateLessonAction.CREATE_LESSON_FAILED,
    (resolve) =>
      (error: unknown): TCreateLessonFailed =>
        resolve({ error }),
  ),
};
