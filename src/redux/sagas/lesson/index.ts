import { all, takeLatest } from 'redux-saga/effects';

import {
  createLessonAction,
  deleteLessonsAction,
  getLessonsFromExerciseAction,
  updateLessonQuestionsIndexAction,
  updateLessonAction,
} from '@/redux/actions';

import { createLessonSaga } from './create-lesson';
import { deleteLessonsSaga } from './delete-lessons';
import { getLessonsFromExerciseSaga } from './get-lessons-from-exercise';
import { updateLessonQuestionsIndexSaga } from './update-lesson-questions-index';
import { updateLessonSaga } from './update-lesson';

export default function* root(): Generator {
  yield all([
    takeLatest(createLessonAction.request.type, createLessonSaga),
    takeLatest(deleteLessonsAction.request.type, deleteLessonsSaga),
    takeLatest(getLessonsFromExerciseAction.request.type, getLessonsFromExerciseSaga),
    takeLatest(updateLessonQuestionsIndexAction.request.type, updateLessonQuestionsIndexSaga),
    takeLatest(updateLessonAction.request.type, updateLessonSaga),
  ]);
}
