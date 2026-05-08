import { TLessonState } from '@/redux/reducers/lesson';
import { TUpdateLessonSuccess } from '@/redux/actions/lesson';

export const updateLessonUpdateState = (state: TLessonState, action: TUpdateLessonSuccess): TLessonState => ({
  ...state,
  updateLessonResponse: action.payload.response,
});
