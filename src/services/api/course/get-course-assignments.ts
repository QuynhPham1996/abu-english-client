import { TLesson } from '@/common/models';
import ApiService from '@/services/api';

export type TGetCourseAssignmentsPaths = {
  id: string | number;
};

export type TGetCourseAssignmentsMaterials = {
  paths?: TGetCourseAssignmentsPaths;
};

export type TGetCourseAssignmentsResponse = {
  data: TLesson[];
};

export const getCourseAssignments = async ({
  paths,
}: TGetCourseAssignmentsMaterials): Promise<TGetCourseAssignmentsResponse> => {
  const response = await ApiService.get(`/courses/${paths?.id}/assignments`);
  return response?.data;
};
