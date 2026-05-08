import { createActionCreator } from 'deox';

import {
  TUpdateLessonQuestionsIndexMaterials,
  TUpdateLessonQuestionsIndexResponse,
} from '@/services/api/lesson/update-lesson-questions-index';

// CONSTANTS

export enum EUpdateLessonQuestionsIndexAction {
  UPDATE_LESSON_QUESTIONS_INDEX = 'UPDATE_LESSON_QUESTIONS_INDEX',
  UPDATE_LESSON_QUESTIONS_INDEX_REQUEST = 'UPDATE_LESSON_QUESTIONS_INDEX_REQUEST',
  UPDATE_LESSON_QUESTIONS_INDEX_SUCCESS = 'UPDATE_LESSON_QUESTIONS_INDEX_SUCCESS',
  UPDATE_LESSON_QUESTIONS_INDEX_FAILED = 'UPDATE_LESSON_QUESTIONS_INDEX_FAILED',
}

// TYPES

export type TUpdateLessonQuestionsIndexRequest = {
  type: EUpdateLessonQuestionsIndexAction.UPDATE_LESSON_QUESTIONS_INDEX_REQUEST;
  payload: {
    materials: TUpdateLessonQuestionsIndexMaterials;
    successCallback?: (response: TUpdateLessonQuestionsIndexResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TUpdateLessonQuestionsIndexSuccess = {
  type: EUpdateLessonQuestionsIndexAction.UPDATE_LESSON_QUESTIONS_INDEX_SUCCESS;
  payload: { response: TUpdateLessonQuestionsIndexResponse };
};

export type TUpdateLessonQuestionsIndexFailed = {
  type: EUpdateLessonQuestionsIndexAction.UPDATE_LESSON_QUESTIONS_INDEX_FAILED;
};

// FUNCTION

export const updateLessonQuestionsIndexAction = {
  request: createActionCreator(
    EUpdateLessonQuestionsIndexAction.UPDATE_LESSON_QUESTIONS_INDEX_REQUEST,
    (resolve) =>
      (
        materials: TUpdateLessonQuestionsIndexMaterials,
        successCallback?: (response: TUpdateLessonQuestionsIndexResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TUpdateLessonQuestionsIndexRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EUpdateLessonQuestionsIndexAction.UPDATE_LESSON_QUESTIONS_INDEX_SUCCESS,
    (resolve) =>
      (response: TUpdateLessonQuestionsIndexResponse): TUpdateLessonQuestionsIndexSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EUpdateLessonQuestionsIndexAction.UPDATE_LESSON_QUESTIONS_INDEX_FAILED,
    (resolve) =>
      (error: unknown): TUpdateLessonQuestionsIndexFailed =>
        resolve({ error }),
  ),
};
