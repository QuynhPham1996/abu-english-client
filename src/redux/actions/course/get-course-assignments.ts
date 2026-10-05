import { createActionCreator } from 'deox';

import { TGetCourseAssignmentsMaterials, TGetCourseAssignmentsResponse } from '@/services/api/course/get-course-assignments';

export enum EGetCourseAssignmentsAction {
  GET_COURSE_ASSIGNMENTS = 'GET_COURSE_ASSIGNMENTS',
  GET_COURSE_ASSIGNMENTS_REQUEST = 'GET_COURSE_ASSIGNMENTS_REQUEST',
  GET_COURSE_ASSIGNMENTS_SUCCESS = 'GET_COURSE_ASSIGNMENTS_SUCCESS',
  GET_COURSE_ASSIGNMENTS_FAILED = 'GET_COURSE_ASSIGNMENTS_FAILED',
}

export type TGetCourseAssignmentsRequest = {
  type: EGetCourseAssignmentsAction.GET_COURSE_ASSIGNMENTS_REQUEST;
  payload: {
    materials: TGetCourseAssignmentsMaterials;
    successCallback?: (response: TGetCourseAssignmentsResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TGetCourseAssignmentsSuccess = {
  type: EGetCourseAssignmentsAction.GET_COURSE_ASSIGNMENTS_SUCCESS;
  payload: { response: TGetCourseAssignmentsResponse };
};

export type TGetCourseAssignmentsFailed = { type: EGetCourseAssignmentsAction.GET_COURSE_ASSIGNMENTS_FAILED };

export const getCourseAssignmentsAction = {
  request: createActionCreator(
    EGetCourseAssignmentsAction.GET_COURSE_ASSIGNMENTS_REQUEST,
    (resolve) =>
      (
        materials: TGetCourseAssignmentsMaterials,
        successCallback?: (response: TGetCourseAssignmentsResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TGetCourseAssignmentsRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EGetCourseAssignmentsAction.GET_COURSE_ASSIGNMENTS_SUCCESS,
    (resolve) =>
      (response: TGetCourseAssignmentsResponse): TGetCourseAssignmentsSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EGetCourseAssignmentsAction.GET_COURSE_ASSIGNMENTS_FAILED,
    (resolve) =>
      (error: unknown): TGetCourseAssignmentsFailed =>
        resolve({ error }),
  ),
};
