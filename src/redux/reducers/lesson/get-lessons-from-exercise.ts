import { TLessonState } from '@/redux/reducers/lesson';
import { TGetLessonsFromExerciseSuccess } from '@/redux/actions/lesson';

export const getLessonsFromExerciseUpdateState = (
  state: TLessonState,
  action: TGetLessonsFromExerciseSuccess,
): TLessonState => ({
  ...state,
  getLessonsFromExerciseResponse: action.payload.response,
});
