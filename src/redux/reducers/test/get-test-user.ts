import { TTestState } from '@/redux/reducers/test';
import { TGetTestUserSuccess } from '@/redux/actions/test';

export const getTestUserUpdateState = (state: TTestState, action: TGetTestUserSuccess): TTestState => ({
  ...state,
  getTestUserResponse: action.payload.response,
});
