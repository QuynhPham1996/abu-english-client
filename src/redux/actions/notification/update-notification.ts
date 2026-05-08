import { createActionCreator } from 'deox';

import {
  TUpdateNotificationMaterials,
  TUpdateNotificationResponse,
} from '@/services/api/notification/update-notification';

// CONSTANTS

export enum EUpdateNotificationAction {
  UPDATE_NOTIFICATION = 'UPDATE_NOTIFICATION',
  UPDATE_NOTIFICATION_REQUEST = 'UPDATE_NOTIFICATION_REQUEST',
  UPDATE_NOTIFICATION_SUCCESS = 'UPDATE_NOTIFICATION_SUCCESS',
  UPDATE_NOTIFICATION_FAILED = 'UPDATE_NOTIFICATION_FAILED',
}

// TYPES

export type TUpdateNotificationRequest = {
  type: EUpdateNotificationAction.UPDATE_NOTIFICATION_REQUEST;
  payload: {
    materials: TUpdateNotificationMaterials;
    successCallback?: (response: TUpdateNotificationResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TUpdateNotificationSuccess = {
  type: EUpdateNotificationAction.UPDATE_NOTIFICATION_SUCCESS;
  payload: { response: TUpdateNotificationResponse };
};

export type TUpdateNotificationFailed = { type: EUpdateNotificationAction.UPDATE_NOTIFICATION_FAILED };

// FUNCTION

export const updateNotificationAction = {
  request: createActionCreator(
    EUpdateNotificationAction.UPDATE_NOTIFICATION_REQUEST,
    (resolve) =>
      (
        materials: TUpdateNotificationMaterials,
        successCallback?: (response: TUpdateNotificationResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TUpdateNotificationRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EUpdateNotificationAction.UPDATE_NOTIFICATION_SUCCESS,
    (resolve) =>
      (response: TUpdateNotificationResponse): TUpdateNotificationSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EUpdateNotificationAction.UPDATE_NOTIFICATION_FAILED,
    (resolve) =>
      (error: unknown): TUpdateNotificationFailed =>
        resolve({ error }),
  ),
};
