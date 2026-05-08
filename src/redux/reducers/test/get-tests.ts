import { TTestState } from '@/redux/reducers/test';
import { TGetTestsSuccess } from '@/redux/actions/test';

export const getTestsUpdateState = (state: TTestState, action: TGetTestsSuccess): TTestState => ({
  ...state,
  getTestsResponse: action.payload.response,
});
