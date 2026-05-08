import { TTestState } from '@/redux/reducers/test';
import { TGradedTestSuccess } from '@/redux/actions/test';

export const gradedTestUpdateState = (state: TTestState, action: TGradedTestSuccess): TTestState => ({
  ...state,
  gradedTestResponse: action.payload.response,
});
