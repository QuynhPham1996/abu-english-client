import { TLessonState } from '@/redux/reducers/lesson';
import { TAddLessonQuestionsSuccess } from '@/redux/actions/lesson';

export const addLessonQuestionsUpdateState = (
  state: TLessonState,
  action: TAddLessonQuestionsSuccess,
): TLessonState => ({
  ...state,
  addLessonQuestionsResponse: action.payload.response,
});
