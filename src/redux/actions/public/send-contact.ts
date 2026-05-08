import { createActionCreator } from 'deox';

import { TSendContactMaterials, TSendContactResponse } from '@/services/api/public/send-contact';

// CONSTANTS

export enum ESendContactAction {
  SEND_CONTACT = 'SEND_CONTACT',
  SEND_CONTACT_REQUEST = 'SEND_CONTACT_REQUEST',
  SEND_CONTACT_SUCCESS = 'SEND_CONTACT_SUCCESS',
  SEND_CONTACT_FAILED = 'SEND_CONTACT_FAILED',
}

// TYPES

export type TSendContactRequest = {
  type: ESendContactAction.SEND_CONTACT_REQUEST;
  payload: {
    materials: TSendContactMaterials;
    successCallback?: (response: TSendContactResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TSendContactSuccess = {
  type: ESendContactAction.SEND_CONTACT_SUCCESS;
  payload: { response: TSendContactResponse };
};

export type TSendContactFailed = { type: ESendContactAction.SEND_CONTACT_FAILED };

// FUNCTION

export const sendContactAction = {
  request: createActionCreator(
    ESendContactAction.SEND_CONTACT_REQUEST,
    (resolve) =>
      (
        materials: TSendContactMaterials,
        successCallback?: (response: TSendContactResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TSendContactRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    ESendContactAction.SEND_CONTACT_SUCCESS,
    (resolve) =>
      (response: TSendContactResponse): TSendContactSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    ESendContactAction.SEND_CONTACT_FAILED,
    (resolve) =>
      (error: unknown): TSendContactFailed =>
        resolve({ error }),
  ),
};
