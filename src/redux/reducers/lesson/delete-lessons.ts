import { TLessonState } from '@/redux/reducers/lesson';
import { TDeleteLessonsSuccess } from '@/redux/actions/lesson';

export const deleteLessonsUpdateState = (state: TLessonState, action: TDeleteLessonsSuccess): TLessonState => ({
  ...state,
  deleteLessonsResponse: action.payload.response,
});
