import { createActionCreator } from 'deox';

import {
  TAttachCourseAssignmentsMaterials,
  TAttachCourseAssignmentsResponse,
} from '@/services/api/course/attach-course-assignments';

export enum EAttachCourseAssignmentsAction {
  ATTACH_COURSE_ASSIGNMENTS = 'ATTACH_COURSE_ASSIGNMENTS',
  ATTACH_COURSE_ASSIGNMENTS_REQUEST = 'ATTACH_COURSE_ASSIGNMENTS_REQUEST',
  ATTACH_COURSE_ASSIGNMENTS_SUCCESS = 'ATTACH_COURSE_ASSIGNMENTS_SUCCESS',
  ATTACH_COURSE_ASSIGNMENTS_FAILED = 'ATTACH_COURSE_ASSIGNMENTS_FAILED',
}

export type TAttachCourseAssignmentsRequest = {
  type: EAttachCourseAssignmentsAction.ATTACH_COURSE_ASSIGNMENTS_REQUEST;
  payload: {
    materials: TAttachCourseAssignmentsMaterials;
    successCallback?: (response: TAttachCourseAssignmentsResponse) => void;
    failedCallback?: (err: unknown) => void;
  };
};

export type TAttachCourseAssignmentsSuccess = {
  type: EAttachCourseAssignmentsAction.ATTACH_COURSE_ASSIGNMENTS_SUCCESS;
  payload: { response: TAttachCourseAssignmentsResponse };
};

export type TAttachCourseAssignmentsFailed = { type: EAttachCourseAssignmentsAction.ATTACH_COURSE_ASSIGNMENTS_FAILED };

export const attachCourseAssignmentsAction = {
  request: createActionCreator(
    EAttachCourseAssignmentsAction.ATTACH_COURSE_ASSIGNMENTS_REQUEST,
    (resolve) =>
      (
        materials: TAttachCourseAssignmentsMaterials,
        successCallback?: (response: TAttachCourseAssignmentsResponse) => void,
        failedCallback?: (err: unknown) => void,
      ): TAttachCourseAssignmentsRequest =>
        resolve({ materials, successCallback, failedCallback }),
  ),
  success: createActionCreator(
    EAttachCourseAssignmentsAction.ATTACH_COURSE_ASSIGNMENTS_SUCCESS,
    (resolve) =>
      (response: TAttachCourseAssignmentsResponse): TAttachCourseAssignmentsSuccess =>
        resolve({ response }),
  ),
  failure: createActionCreator(
    EAttachCourseAssignmentsAction.ATTACH_COURSE_ASSIGNMENTS_FAILED,
    (resolve) =>
      (error: unknown): TAttachCourseAssignmentsFailed =>
        resolve({ error }),
  ),
};
