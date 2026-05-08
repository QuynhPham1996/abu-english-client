import { TTestState } from '@/redux/reducers/test';
import { TGetTestsUserSuccess } from '@/redux/actions/test';

export const getTestsUserUpdateState = (state: TTestState, action: TGetTestsUserSuccess): TTestState => ({
  ...state,
  getTestsUserResponse: action.payload.response,
});
