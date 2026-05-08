import { TLessonState } from '@/redux/reducers/lesson';
import { TCreateLessonSuccess } from '@/redux/actions/lesson';

export const createLessonUpdateState = (state: TLessonState, action: TCreateLessonSuccess): TLessonState => ({
  ...state,
  createLessonResponse: action.payload.response,
});
