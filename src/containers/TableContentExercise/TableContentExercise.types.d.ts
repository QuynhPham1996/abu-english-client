import { TUserExercises, TUserLessons } from '@/common/models';

export type TTableContentExerciseProps = {
  userExercises?: TUserExercises[];
  userLessons?: TUserLessons[];
  showBadge?: boolean;
  showLessons?: boolean;
  collapsibleLessons?: boolean;
  gradedLessonIds?: string[];
  activeId?: string;
  getLessonDescription?: (userLesson: TUserLessons) => string;
};
