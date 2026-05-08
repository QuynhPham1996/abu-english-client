import { createActionCreator } from 'deox';

import {
  TCreateNotificationMaterials,
  TCreateNotificationResponse,
} from '@/services/api/notification/create-notification';

// CONSTANTS

export enum ECreateNotificationAction {
  CREATE_NOTIFICATION = 'CREATE_NOTIFICATION',
  CREATE_NOTIFICATION_REQUEST = 'CREATE_NOTIFICATION_REQUEST',
  CREATE_NOTIFICATION_SUCCESS = 'CREATE_NOTIFICATION_SUCCESS',
  CREATE_NOTIFICATION_FAILED = 'CREATE_NOTIFICATION_FAILED',
}

// TYPES

export type TCreateNotificationRequest = {
  type: ECreateNotificationAction.CREATE_NOTIFICATION_REQUEST;
  payload: {
    materials: TCreateNotificationMaterials;
    successCallback?: (response: TCreateNotificationResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TCreateNotificationSuccess = {
  type: ECreateNotificationAction.CREATE_NOTIFICATION_SUCCESS;
  payload: { response: TCreateNotificationResponse };
};

export type TCreateNotificationFailed = { type: ECreateNotificationAction.CREATE_NOTIFICATION_FAILED };

// FUNCTION

export const createNotificationAction = {
  request: createActionCreator(
    ECreateNotificationAction.CREATE_NOTIFICATION_REQUEST,
    (resolve) =>
      (
        materials: TCreateNotificationMaterials,
        successCallback?: (response: TCreateNotificationResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TCreateNotificationRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    ECreateNotificationAction.CREATE_NOTIFICATION_SUCCESS,
    (resolve) =>
      (response: TCreateNotificationResponse): TCreateNotificationSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    ECreateNotificationAction.CREATE_NOTIFICATION_FAILED,
    (resolve) =>
      (error: unknown): TCreateNotificationFailed =>
        resolve({ error }),
  ),
};
