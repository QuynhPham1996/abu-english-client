import { createReducer } from 'deox';

import {
  TCreateCourseResponse,
  TDeleteCoursesResponse,
  TGetCourseResponse,
  TGetCoursesAvailableResponse,
  TGetCoursesResponse,
  TGetMyCourseExerciseResponse,
  TGetMyCourseLessonResponse,
  TGetMyCoursesResponse,
  TRegisterCourseResponse,
  TUpdateCourseResponse,
  TWatchingExerciseVideoResponse,
} from '@/services/api/course';
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
import { createCourseUpdateState } from './create-course';
import { deleteCoursesUpdateState } from './delete-courses';
import { getCourseUpdateState } from './get-course';
import { getCoursesAvailableUpdateState } from './get-courses-available';
import { getCoursesUpdateState } from './get-courses';
import { getMyCourseExerciseUpdateState } from './get-my-course-exercise';
import { getMyCourseLessonUpdateState } from './get-my-course-lesson';
import { getMyCoursesUpdateState } from './get-my-courses';
import { registerCourseUpdateState } from './register-course';
import { updateCourseUpdateState } from './update-course';
import { watchingExerciseVideoUpdateState } from './watching-exercise-video';

export type TCourseState = {
  createCourseResponse?: TCreateCourseResponse;
  deleteCoursesResponse?: TDeleteCoursesResponse;
  getCourseResponse?: TGetCourseResponse;
  getCoursesAvailableResponse?: TGetCoursesAvailableResponse;
  getCoursesResponse?: TGetCoursesResponse;
  getMyCourseExerciseResponse?: TGetMyCourseExerciseResponse;
  getMyCourseLessonResponse?: TGetMyCourseLessonResponse;
  getMyCoursesResponse?: TGetMyCoursesResponse;
  registerCourseResponse?: TRegisterCourseResponse;
  updateCourseResponse?: TUpdateCourseResponse;
  watchingExerciseVideoResponse?: TWatchingExerciseVideoResponse;
};

const initialState: TCourseState = {
  createCourseResponse: undefined,
  deleteCoursesResponse: undefined,
  getCourseResponse: undefined,
  getCoursesAvailableResponse: undefined,
  getCoursesResponse: undefined,
  getMyCourseExerciseResponse: undefined,
  getMyCourseLessonResponse: undefined,
  getMyCoursesResponse: undefined,
  registerCourseResponse: undefined,
  updateCourseResponse: undefined,
  watchingExerciseVideoResponse: undefined,
};

const CourseReducer = createReducer(initialState, (handleAction) => [
  handleAction(createCourseAction.success, createCourseUpdateState),
  handleAction(deleteCoursesAction.success, deleteCoursesUpdateState),
  handleAction(getCourseAction.success, getCourseUpdateState),
  handleAction(getCoursesAvailableAction.success, getCoursesAvailableUpdateState),
  handleAction(getCoursesAction.success, getCoursesUpdateState),
  handleAction(getMyCourseExerciseAction.success, getMyCourseExerciseUpdateState),
  handleAction(getMyCourseLessonAction.success, getMyCourseLessonUpdateState),
  handleAction(getMyCoursesAction.success, getMyCoursesUpdateState),
  handleAction(registerCourseAction.success, registerCourseUpdateState),
  handleAction(updateCourseAction.success, updateCourseUpdateState),
  handleAction(watchingExerciseVideoAction.success, watchingExerciseVideoUpdateState),
]);

export default CourseReducer;
