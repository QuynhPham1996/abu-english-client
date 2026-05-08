import { createActionCreator } from 'deox';

import {
  TGetCoursesAvailableMaterials,
  TGetCoursesAvailableResponse,
} from '@/services/api/course/get-courses-available';

// CONSTANTS

export enum EGetCoursesAvailableAction {
  GET_COURSES_AVAILABLE = 'GET_COURSES_AVAILABLE',
  GET_COURSES_AVAILABLE_REQUEST = 'GET_COURSES_AVAILABLE_REQUEST',
  GET_COURSES_AVAILABLE_SUCCESS = 'GET_COURSES_AVAILABLE_SUCCESS',
  GET_COURSES_AVAILABLE_FAILED = 'GET_COURSES_AVAILABLE_FAILED',
}

// TYPES

export type TGetCoursesAvailableRequest = {
  type: EGetCoursesAvailableAction.GET_COURSES_AVAILABLE_REQUEST;
  payload: {
    materials: TGetCoursesAvailableMaterials;
    successCallback?: (response: TGetCoursesAvailableResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetCoursesAvailableSuccess = {
  type: EGetCoursesAvailableAction.GET_COURSES_AVAILABLE_SUCCESS;
  payload: { response: TGetCoursesAvailableResponse };
};

export type TGetCoursesAvailableFailed = { type: EGetCoursesAvailableAction.GET_COURSES_AVAILABLE_FAILED };

// FUNCTION

export const getCoursesAvailableAction = {
  request: createActionCreator(
    EGetCoursesAvailableAction.GET_COURSES_AVAILABLE_REQUEST,
    (resolve) =>
      (
        materials: TGetCoursesAvailableMaterials,
        successCallback?: (response: TGetCoursesAvailableResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetCoursesAvailableRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetCoursesAvailableAction.GET_COURSES_AVAILABLE_SUCCESS,
    (resolve) =>
      (response: TGetCoursesAvailableResponse): TGetCoursesAvailableSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetCoursesAvailableAction.GET_COURSES_AVAILABLE_FAILED,
    (resolve) =>
      (error: unknown): TGetCoursesAvailableFailed =>
        resolve({ error }),
  ),
};
