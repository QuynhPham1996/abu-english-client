import { createActionCreator } from 'deox';

import { TAddLessonGroupMaterials, TAddLessonGroupResponse } from '@/services/api/lesson/add-lesson-group';

// CONSTANTS

export enum EAddLessonGroupAction {
  ADD_LESSON_GROUP = 'ADD_LESSON_GROUP',
  ADD_LESSON_GROUP_REQUEST = 'ADD_LESSON_GROUP_REQUEST',
  ADD_LESSON_GROUP_SUCCESS = 'ADD_LESSON_GROUP_SUCCESS',
  ADD_LESSON_GROUP_FAILED = 'ADD_LESSON_GROUP_FAILED',
}

// TYPES

export type TAddLessonGroupRequest = {
  type: EAddLessonGroupAction.ADD_LESSON_GROUP_REQUEST;
  payload: {
    materials: TAddLessonGroupMaterials;
    successCallback?: (response: TAddLessonGroupResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TAddLessonGroupSuccess = {
  type: EAddLessonGroupAction.ADD_LESSON_GROUP_SUCCESS;
  payload: { response: TAddLessonGroupResponse };
};

export type TAddLessonGroupFailed = { type: EAddLessonGroupAction.ADD_LESSON_GROUP_FAILED };

// FUNCTION

export const addLessonGroupAction = {
  request: createActionCreator(
    EAddLessonGroupAction.ADD_LESSON_GROUP_REQUEST,
    (resolve) =>
      (
        materials: TAddLessonGroupMaterials,
        successCallback?: (response: TAddLessonGroupResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TAddLessonGroupRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EAddLessonGroupAction.ADD_LESSON_GROUP_SUCCESS,
    (resolve) =>
      (response: TAddLessonGroupResponse): TAddLessonGroupSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EAddLessonGroupAction.ADD_LESSON_GROUP_FAILED,
    (resolve) =>
      (error: unknown): TAddLessonGroupFailed =>
        resolve({ error }),
  ),
};
