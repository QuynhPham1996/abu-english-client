import { TLessonState } from '@/redux/reducers/lesson';
import { TUpdateLessonQuestionsIndexSuccess } from '@/redux/actions/lesson';

export const updateLessonQuestionsIndexUpdateState = (
  state: TLessonState,
  action: TUpdateLessonQuestionsIndexSuccess,
): TLessonState => ({
  ...state,
  updateLessonQuestionsIndexResponse: action.payload.response,
});
