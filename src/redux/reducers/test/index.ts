import { createReducer } from 'deox';

import {
  TCreateTestResponse,
  TGetTestUserResponse,
  TGetTestsUserResponse,
  TGetTestsResponse,
  TGradedTestResponse,
} from '@/services/api/test';
import {
  createTestAction,
  getTestUserAction,
  getTestsUserAction,
  getTestsAction,
  gradedTestAction,
} from '@/redux/actions';
import { createTestUpdateState } from './create-test';
import { getTestUserUpdateState } from './get-test-user';
import { getTestsUserUpdateState } from './get-tests-user';
import { getTestsUpdateState } from './get-tests';
import { gradedTestUpdateState } from './graded-test';

export type TTestState = {
  createTestResponse?: TCreateTestResponse;
  getTestUserResponse?: TGetTestUserResponse;
  getTestsUserResponse?: TGetTestsUserResponse;
  getTestsResponse?: TGetTestsResponse;
  gradedTestResponse?: TGradedTestResponse;
};

const initialState: TTestState = {
  createTestResponse: undefined,
  getTestUserResponse: undefined,
  getTestsUserResponse: undefined,
  getTestsResponse: undefined,
  gradedTestResponse: undefined,
};

const TestReducer = createReducer(initialState, (handleAction) => [
  handleAction(createTestAction.success, createTestUpdateState),
  handleAction(getTestUserAction.success, getTestUserUpdateState),
  handleAction(getTestsUserAction.success, getTestsUserUpdateState),
  handleAction(getTestsAction.success, getTestsUpdateState),
  handleAction(gradedTestAction.success, gradedTestUpdateState),
]);

export default TestReducer;
