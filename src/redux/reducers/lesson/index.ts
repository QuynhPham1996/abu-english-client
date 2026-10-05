import { createReducer } from 'deox';

import {
  TAddLessonGroupResponse,
  TAddLessonQuestionsResponse,
  TCreateLessonResponse,
  TDeleteLessonsResponse,
  TGetLessonsFromExerciseResponse,
  TUpdateLessonQuestionsIndexResponse,
  TUpdateLessonResponse,
} from '@/services/api/lesson';
import {
  addLessonGroupAction,
  addLessonQuestionsAction,
  createLessonAction,
  deleteLessonsAction,
  getLessonsFromExerciseAction,
  updateLessonQuestionsIndexAction,
  updateLessonAction,
} from '@/redux/actions';
import { addLessonGroupUpdateState } from './add-lesson-group';
import { addLessonQuestionsUpdateState } from './add-lesson-questions';
import { createLessonUpdateState } from './create-lesson';
import { deleteLessonsUpdateState } from './delete-lessons';
import { getLessonsFromExerciseUpdateState } from './get-lessons-from-exercise';
import { updateLessonQuestionsIndexUpdateState } from './update-lesson-questions-index';
import { updateLessonUpdateState } from './update-lesson';

export type TLessonState = {
  addLessonGroupResponse?: TAddLessonGroupResponse;
  addLessonQuestionsResponse?: TAddLessonQuestionsResponse;
  createLessonResponse?: TCreateLessonResponse;
  deleteLessonsResponse?: TDeleteLessonsResponse;
  getLessonsFromExerciseResponse?: TGetLessonsFromExerciseResponse;
  updateLessonQuestionsIndexResponse?: TUpdateLessonQuestionsIndexResponse;
  updateLessonResponse?: TUpdateLessonResponse;
};

const initialState: TLessonState = {
  addLessonGroupResponse: undefined,
  addLessonQuestionsResponse: undefined,
  createLessonResponse: undefined,
  deleteLessonsResponse: undefined,
  getLessonsFromExerciseResponse: undefined,
  updateLessonQuestionsIndexResponse: undefined,
  updateLessonResponse: undefined,
};

const LessonReducer = createReducer(initialState, (handleAction) => [
  handleAction(addLessonGroupAction.success, addLessonGroupUpdateState),
  handleAction(addLessonQuestionsAction.success, addLessonQuestionsUpdateState),
  handleAction(createLessonAction.success, createLessonUpdateState),
  handleAction(deleteLessonsAction.success, deleteLessonsUpdateState),
  handleAction(getLessonsFromExerciseAction.success, getLessonsFromExerciseUpdateState),
  handleAction(updateLessonQuestionsIndexAction.success, updateLessonQuestionsIndexUpdateState),
  handleAction(updateLessonAction.success, updateLessonUpdateState),
]);

export default LessonReducer;
