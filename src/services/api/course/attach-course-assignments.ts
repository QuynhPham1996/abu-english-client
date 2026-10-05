import ApiService from '@/services/api';

export type TAttachCourseAssignmentsPaths = {
  id: string | number;
};

export type TAttachCourseAssignmentsBody = {
  assignmentIds: string[];
};

export type TAttachCourseAssignmentsMaterials = {
  paths?: TAttachCourseAssignmentsPaths;
  body?: TAttachCourseAssignmentsBody;
};

export type TAttachCourseAssignmentsResponse = {
  attached: number;
  skipped: number;
};

export const attachCourseAssignments = async ({
  paths,
  body,
}: TAttachCourseAssignmentsMaterials): Promise<TAttachCourseAssignmentsResponse> => {
  const response = await ApiService.post(`/courses/${paths?.id}/assignments`, body);
  return response?.data;
};
