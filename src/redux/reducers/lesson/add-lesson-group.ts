import { TLessonState } from '@/redux/reducers/lesson';
import { TAddLessonGroupSuccess } from '@/redux/actions/lesson';

export const addLessonGroupUpdateState = (state: TLessonState, action: TAddLessonGroupSuccess): TLessonState => ({
  ...state,
  addLessonGroupResponse: action.payload.response,
});
