import { createActionCreator } from 'deox';

import { TAddAssignmentQuestionsMaterials, TAddAssignmentQuestionsResponse } from '@/services/api/assignment/add-assignment-questions';

// CONSTANTS

export enum EAddAssignmentQuestionsAction {
  ADD_ASSIGNMENT_QUESTIONS = 'ADD_ASSIGNMENT_QUESTIONS',
  ADD_ASSIGNMENT_QUESTIONS_REQUEST = 'ADD_ASSIGNMENT_QUESTIONS_REQUEST',
  ADD_ASSIGNMENT_QUESTIONS_SUCCESS = 'ADD_ASSIGNMENT_QUESTIONS_SUCCESS',
  ADD_ASSIGNMENT_QUESTIONS_FAILED = 'ADD_ASSIGNMENT_QUESTIONS_FAILED',
}

// TYPES

export type TAddAssignmentQuestionsRequest = {
  type: EAddAssignmentQuestionsAction.ADD_ASSIGNMENT_QUESTIONS_REQUEST;
  payload: {
    materials: TAddAssignmentQuestionsMaterials;
    successCallback?: (response: TAddAssignmentQuestionsResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TAddAssignmentQuestionsSuccess = {
  type: EAddAssignmentQuestionsAction.ADD_ASSIGNMENT_QUESTIONS_SUCCESS;
  payload: { response: TAddAssignmentQuestionsResponse };
};

export type TAddAssignmentQuestionsFailed = { type: EAddAssignmentQuestionsAction.ADD_ASSIGNMENT_QUESTIONS_FAILED };

// FUNCTION

export const addAssignmentQuestionsAction = {
  request: createActionCreator(
    EAddAssignmentQuestionsAction.ADD_ASSIGNMENT_QUESTIONS_REQUEST,
    (resolve) =>
      (
        materials: TAddAssignmentQuestionsMaterials,
        successCallback?: (response: TAddAssignmentQuestionsResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TAddAssignmentQuestionsRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EAddAssignmentQuestionsAction.ADD_ASSIGNMENT_QUESTIONS_SUCCESS,
    (resolve) =>
      (response: TAddAssignmentQuestionsResponse): TAddAssignmentQuestionsSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EAddAssignmentQuestionsAction.ADD_ASSIGNMENT_QUESTIONS_FAILED,
    (resolve) =>
      (error: unknown): TAddAssignmentQuestionsFailed =>
        resolve({ error }),
  ),
};
