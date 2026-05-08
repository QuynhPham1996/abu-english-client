import { TUserExercises, TUserLessons } from '@/common/models';
import ApiService from '@/services/api';

// TYPES

export type TGetMyCourseLessonPaths = {
  id: string | number;
};
export type TGetMyCourseLessonParams = unknown;

export type TGetMyCourseLessonMaterials = {
  paths?: TGetMyCourseLessonPaths;
  params?: TGetMyCourseLessonParams;
};

export type TGetMyCourseLessonResponse = { data: TUserLessons; userExercise: TUserExercises; nextLesson?: TUserLessons };

// FUNCTION

export const getMyCourseLesson = async ({
  paths,
  params,
}: TGetMyCourseLessonMaterials): Promise<TGetMyCourseLessonResponse> => {
  const response = await ApiService.get(`/courses/my-courses/lesson/${paths?.id}`, { params });
  return response?.data;
};
