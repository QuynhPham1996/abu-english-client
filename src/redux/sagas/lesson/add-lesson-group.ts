import { ActionType } from 'deox';
import { call, put } from 'redux-saga/effects';

import { addLessonGroupAction } from '@/redux/actions';
import { addLessonGroup, TAddLessonGroupResponse } from '@/services/api';

// FUNCTION

export function* addLessonGroupSaga(action: ActionType<typeof addLessonGroupAction.request>): Generator {
  const { materials, successCallback, failedCallback } = action.payload;
  try {
    const response = yield call(addLessonGroup, materials);
    const addLessonGroupResponse: TAddLessonGroupResponse = response as TAddLessonGroupResponse;
    yield put(addLessonGroupAction.success(addLessonGroupResponse));
    successCallback?.(addLessonGroupResponse);
  } catch (err) {
    yield put(addLessonGroupAction.failure(err));
    failedCallback?.(err);
  }
}
