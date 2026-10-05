import { all, takeLatest } from 'redux-saga/effects';

import {
  createExerciseAction,
  deleteExercisesAction,
  getExerciseAction,
  getExercisesFromCourseAction,
  updateExerciseAction,
  uploadExerciseVideoAction,
  attachExerciseAssignmentsAction,
} from '@/redux/actions';

import { createExerciseSaga } from './create-exercise';
import { deleteExercisesSaga } from './delete-exercises';
import { getExerciseSaga } from './get-exercise';
import { getExercisesFromCourseSaga } from './get-exercises-from-course';
import { updateExerciseSaga } from './update-exercise';
import { uploadExerciseVideoSaga } from './upload-exercise-video';
import { attachExerciseAssignmentsSaga } from './attach-exercise-assignments';

export default function* root(): Generator {
  yield all([
    takeLatest(createExerciseAction.request.type, createExerciseSaga),
    takeLatest(deleteExercisesAction.request.type, deleteExercisesSaga),
    takeLatest(getExerciseAction.request.type, getExerciseSaga),
    takeLatest(getExercisesFromCourseAction.request.type, getExercisesFromCourseSaga),
    takeLatest(updateExerciseAction.request.type, updateExerciseSaga),
    takeLatest(uploadExerciseVideoAction.request.type, uploadExerciseVideoSaga),
    takeLatest(attachExerciseAssignmentsAction.request.type, attachExerciseAssignmentsSaga),
  ]);
}
