import { createActionCreator } from 'deox';

import { TGetNotificationsMaterials, TGetNotificationsResponse } from '@/services/api/notification/get-notifications';

// CONSTANTS

export enum EGetNotificationsAction {
  GET_NOTIFICATIONS = 'GET_NOTIFICATIONS',
  GET_NOTIFICATIONS_REQUEST = 'GET_NOTIFICATIONS_REQUEST',
  GET_NOTIFICATIONS_SUCCESS = 'GET_NOTIFICATIONS_SUCCESS',
  GET_NOTIFICATIONS_FAILED = 'GET_NOTIFICATIONS_FAILED',
}

// TYPES

export type TGetNotificationsRequest = {
  type: EGetNotificationsAction.GET_NOTIFICATIONS_REQUEST;
  payload: {
    materials: TGetNotificationsMaterials;
    successCallback?: (response: TGetNotificationsResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetNotificationsSuccess = {
  type: EGetNotificationsAction.GET_NOTIFICATIONS_SUCCESS;
  payload: { response: TGetNotificationsResponse };
};

export type TGetNotificationsFailed = { type: EGetNotificationsAction.GET_NOTIFICATIONS_FAILED };

// FUNCTION

export const getNotificationsAction = {
  request: createActionCreator(
    EGetNotificationsAction.GET_NOTIFICATIONS_REQUEST,
    (resolve) =>
      (
        materials: TGetNotificationsMaterials,
        successCallback?: (response: TGetNotificationsResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetNotificationsRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetNotificationsAction.GET_NOTIFICATIONS_SUCCESS,
    (resolve) =>
      (response: TGetNotificationsResponse): TGetNotificationsSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetNotificationsAction.GET_NOTIFICATIONS_FAILED,
    (resolve) =>
      (error: unknown): TGetNotificationsFailed =>
        resolve({ error }),
  ),
};
