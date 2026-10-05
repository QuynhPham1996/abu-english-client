import { createActionCreator } from 'deox';

import { TCreateQuestionGroupMaterials, TCreateQuestionGroupResponse } from '@/services/api/question-group/create-question-group';

// CONSTANTS

export enum ECreateQuestionGroupAction {
  CREATE_QUESTION_GROUP = 'CREATE_QUESTION_GROUP',
  CREATE_QUESTION_GROUP_REQUEST = 'CREATE_QUESTION_GROUP_REQUEST',
  CREATE_QUESTION_GROUP_SUCCESS = 'CREATE_QUESTION_GROUP_SUCCESS',
  CREATE_QUESTION_GROUP_FAILED = 'CREATE_QUESTION_GROUP_FAILED',
}

// TYPES

export type TCreateQuestionGroupRequest = {
  type: ECreateQuestionGroupAction.CREATE_QUESTION_GROUP_REQUEST;
  payload: {
    materials: TCreateQuestionGroupMaterials;
    successCallback?: (response: TCreateQuestionGroupResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TCreateQuestionGroupSuccess = {
  type: ECreateQuestionGroupAction.CREATE_QUESTION_GROUP_SUCCESS;
  payload: { response: TCreateQuestionGroupResponse };
};

export type TCreateQuestionGroupFailed = { type: ECreateQuestionGroupAction.CREATE_QUESTION_GROUP_FAILED };

// FUNCTION

export const createQuestionGroupAction = {
  request: createActionCreator(
    ECreateQuestionGroupAction.CREATE_QUESTION_GROUP_REQUEST,
    (resolve) =>
      (
        materials: TCreateQuestionGroupMaterials,
        successCallback?: (response: TCreateQuestionGroupResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TCreateQuestionGroupRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    ECreateQuestionGroupAction.CREATE_QUESTION_GROUP_SUCCESS,
    (resolve) =>
      (response: TCreateQuestionGroupResponse): TCreateQuestionGroupSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    ECreateQuestionGroupAction.CREATE_QUESTION_GROUP_FAILED,
    (resolve) =>
      (error: unknown): TCreateQuestionGroupFailed =>
        resolve({ error }),
  ),
};
