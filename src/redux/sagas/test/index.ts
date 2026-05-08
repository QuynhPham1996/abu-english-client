import { all, takeLatest } from 'redux-saga/effects';

import {
  createTestAction,
  getTestUserAction,
  getTestsUserAction,
  getTestsAction,
  gradedTestAction,
} from '@/redux/actions';

import { createTestSaga } from './create-test';
import { getTestUserSaga } from './get-test-user';
import { getTestsUserSaga } from './get-tests-user';
import { getTestsSaga } from './get-tests';
import { gradedTestSaga } from './graded-test';

export default function* root(): Generator {
  yield all([
    takeLatest(createTestAction.request.type, createTestSaga),
    takeLatest(getTestUserAction.request.type, getTestUserSaga),
    takeLatest(getTestsUserAction.request.type, getTestsUserSaga),
    takeLatest(getTestsAction.request.type, getTestsSaga),
    takeLatest(gradedTestAction.request.type, gradedTestSaga),
  ]);
}
