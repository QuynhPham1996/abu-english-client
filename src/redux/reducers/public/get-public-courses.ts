import { TPublicState } from '@/redux/reducers/public';
import { TGetPublicCoursesSuccess } from '@/redux/actions/public';

export const getPublicCoursesUpdateState = (state: TPublicState, action: TGetPublicCoursesSuccess): TPublicState => ({
  ...state,
  getPublicCoursesResponse: action.payload.response,
});
