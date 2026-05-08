import { createReducer } from 'deox';

import {
  TCreateExerciseResponse,
  TDeleteExercisesResponse,
  TGetExerciseResponse,
  TGetExercisesFromCourseResponse,
  TUpdateExerciseResponse,
  TUploadExerciseVideoResponse,
} from '@/services/api/exercise';
import {
  createExerciseAction,
  deleteExercisesAction,
  getExerciseAction,
  getExercisesFromCourseAction,
  updateExerciseAction,
  uploadExerciseVideoAction,
} from '@/redux/actions';
import { createExerciseUpdateState } from './create-exercise';
import { deleteExercisesUpdateState } from './delete-exercises';
import { getExerciseUpdateState } from './get-exercise';
import { getExercisesFromCourseUpdateState } from './get-exercises-from-course';
import { updateExerciseUpdateState } from './update-exercise';
import { uploadExerciseVideoUpdateState } from './upload-exercise-video';

export type TExerciseState = {
  createExerciseResponse?: TCreateExerciseResponse;
  deleteExercisesResponse?: TDeleteExercisesResponse;
  getExerciseResponse?: TGetExerciseResponse;
  getExercisesFromCourseResponse?: TGetExercisesFromCourseResponse;
  updateExerciseResponse?: TUpdateExerciseResponse;
  uploadExerciseVideoResponse?: TUploadExerciseVideoResponse;
};

const initialState: TExerciseState = {
  createExerciseResponse: undefined,
  deleteExercisesResponse: undefined,
  getExerciseResponse: undefined,
  getExercisesFromCourseResponse: undefined,
  updateExerciseResponse: undefined,
  uploadExerciseVideoResponse: undefined,
};

const ExerciseReducer = createReducer(initialState, (handleAction) => [
  handleAction(createExerciseAction.success, createExerciseUpdateState),
  handleAction(deleteExercisesAction.success, deleteExercisesUpdateState),
  handleAction(getExerciseAction.success, getExerciseUpdateState),
  handleAction(getExercisesFromCourseAction.success, getExercisesFromCourseUpdateState),
  handleAction(updateExerciseAction.success, updateExerciseUpdateState),
  handleAction(uploadExerciseVideoAction.success, uploadExerciseVideoUpdateState),
]);

export default ExerciseReducer;
