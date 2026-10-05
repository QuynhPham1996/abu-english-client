import ApiService from '@/services/api';

// TYPES

export type TAttachExerciseAssignmentsPaths = {
  id: string | number;
};

export type TAttachExerciseAssignmentsBody = {
  assignmentIds: string[];
};

export type TAttachExerciseAssignmentsMaterials = {
  paths?: TAttachExerciseAssignmentsPaths;
  body?: TAttachExerciseAssignmentsBody;
};

export type TAttachExerciseAssignmentsResponse = {
  attached: number;
  skipped: number;
};

// FUNCTION

export const attachExerciseAssignments = async ({ paths, body }: TAttachExerciseAssignmentsMaterials): Promise<TAttachExerciseAssignmentsResponse> => {
  const response = await ApiService.post(`/exercises/${paths?.id}/assignments`, body);
  return response?.data;
};
