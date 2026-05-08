import { TTestState } from '@/redux/reducers/test';
import { TCreateTestSuccess } from '@/redux/actions/test';

export const createTestUpdateState = (state: TTestState, action: TCreateTestSuccess): TTestState => ({
  ...state,
  createTestResponse: action.payload.response,
});
