import { createActionCreator } from 'deox';

import { EUIAction } from './constants';
import { TResetActionStatus } from './types';

export const uiActions = {
  resetActionStatus: createActionCreator(
    EUIAction.RESET_ACTION_STATUS,
    (resolve) =>
      (actionName: string): TResetActionStatus =>
        resolve({ actionName: actionName.replace('_REQUEST', '') }),
  ),
};
