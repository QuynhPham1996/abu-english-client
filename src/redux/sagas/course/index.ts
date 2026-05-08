import { all, takeLatest } from 'redux-saga/effects';

import {
  createCourseAction,
  deleteCoursesAction,
  getCourseAction,
  getCoursesAvailableAction,
  getCoursesAction,
  getMyCourseExerciseAction,
  getMyCourseLessonAction,
  getMyCoursesAction,
  registerCourseAction,
  updateCourseAction,
  watchingExerciseVideoAction,
} from '@/redux/actions';

import { createCourseSaga } from './create-course';
import { deleteCoursesSaga } from './delete-courses';
import { getCourseSaga } from './get-course';
import { getCoursesAvailableSaga } from './get-courses-available';
import { getCoursesSaga } from './get-courses';
import { getMyCourseExerciseSaga } from './get-my-course-exercise';
import { getMyCourseLessonSaga } from './get-my-course-lesson';
import { getMyCoursesSaga } from './get-my-courses';
import { registerCourseSaga } from './register-course';
import { updateCourseSaga } from './update-course';
import { watchingExerciseVideoSaga } from './watching-exercise-video';

export default function* root(): Generator {
  yield all([
    takeLatest(createCourseAction.request.type, createCourseSaga),
    takeLatest(deleteCoursesAction.request.type, deleteCoursesSaga),
    takeLatest(getCourseAction.request.type, getCourseSaga),
    takeLatest(getCoursesAvailableAction.request.type, getCoursesAvailableSaga),
    takeLatest(getCoursesAction.request.type, getCoursesSaga),
    takeLatest(getMyCourseExerciseAction.request.type, getMyCourseExerciseSaga),
    takeLatest(getMyCourseLessonAction.request.type, getMyCourseLessonSaga),
    takeLatest(getMyCoursesAction.request.type, getMyCoursesSaga),
    takeLatest(registerCourseAction.request.type, registerCourseSaga),
    takeLatest(updateCourseAction.request.type, updateCourseSaga),
    takeLatest(watchingExerciseVideoAction.request.type, watchingExerciseVideoSaga),
  ]);
}
