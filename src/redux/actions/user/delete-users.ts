import { createActionCreator } from 'deox';

import { TDeleteUsersMaterials, TDeleteUsersResponse } from '@/services/api/user/delete-users';

// CONSTANTS

export enum EDeleteUsersAction {
  DELETE_USERS = 'DELETE_USERS',
  DELETE_USERS_REQUEST = 'DELETE_USERS_REQUEST',
  DELETE_USERS_SUCCESS = 'DELETE_USERS_SUCCESS',
  DELETE_USERS_FAILED = 'DELETE_USERS_FAILED',
}

// TYPES

export type TDeleteUsersRequest = {
  type: EDeleteUsersAction.DELETE_USERS_REQUEST;
  payload: {
    materials: TDeleteUsersMaterials;
    successCallback?: (response: TDeleteUsersResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TDeleteUsersSuccess = {
  type: EDeleteUsersAction.DELETE_USERS_SUCCESS;
  payload: { response: TDeleteUsersResponse };
};

export type TDeleteUsersFailed = { type: EDeleteUsersAction.DELETE_USERS_FAILED };

// FUNCTION

export const deleteUsersAction = {
  request: createActionCreator(
    EDeleteUsersAction.DELETE_USERS_REQUEST,
    (resolve) =>
      (
        materials: TDeleteUsersMaterials,
        successCallback?: (response: TDeleteUsersResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TDeleteUsersRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EDeleteUsersAction.DELETE_USERS_SUCCESS,
    (resolve) =>
      (response: TDeleteUsersResponse): TDeleteUsersSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EDeleteUsersAction.DELETE_USERS_FAILED,
    (resolve) =>
      (error: unknown): TDeleteUsersFailed =>
        resolve({ error }),
  ),
};
