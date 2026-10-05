import { createActionCreator } from 'deox';

import { TAddLessonQuestionsMaterials, TAddLessonQuestionsResponse } from '@/services/api/lesson/add-lesson-questions';

// CONSTANTS

export enum EAddLessonQuestionsAction {
  ADD_LESSON_QUESTIONS = 'ADD_LESSON_QUESTIONS',
  ADD_LESSON_QUESTIONS_REQUEST = 'ADD_LESSON_QUESTIONS_REQUEST',
  ADD_LESSON_QUESTIONS_SUCCESS = 'ADD_LESSON_QUESTIONS_SUCCESS',
  ADD_LESSON_QUESTIONS_FAILED = 'ADD_LESSON_QUESTIONS_FAILED',
}

// TYPES

export type TAddLessonQuestionsRequest = {
  type: EAddLessonQuestionsAction.ADD_LESSON_QUESTIONS_REQUEST;
  payload: {
    materials: TAddLessonQuestionsMaterials;
    successCallback?: (response: TAddLessonQuestionsResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TAddLessonQuestionsSuccess = {
  type: EAddLessonQuestionsAction.ADD_LESSON_QUESTIONS_SUCCESS;
  payload: { response: TAddLessonQuestionsResponse };
};

export type TAddLessonQuestionsFailed = { type: EAddLessonQuestionsAction.ADD_LESSON_QUESTIONS_FAILED };

// FUNCTION

export const addLessonQuestionsAction = {
  request: createActionCreator(
    EAddLessonQuestionsAction.ADD_LESSON_QUESTIONS_REQUEST,
    (resolve) =>
      (
        materials: TAddLessonQuestionsMaterials,
        successCallback?: (response: TAddLessonQuestionsResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TAddLessonQuestionsRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EAddLessonQuestionsAction.ADD_LESSON_QUESTIONS_SUCCESS,
    (resolve) =>
      (response: TAddLessonQuestionsResponse): TAddLessonQuestionsSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EAddLessonQuestionsAction.ADD_LESSON_QUESTIONS_FAILED,
    (resolve) =>
      (error: unknown): TAddLessonQuestionsFailed =>
        resolve({ error }),
  ),
};
