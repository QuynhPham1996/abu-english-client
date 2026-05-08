import { TUserExercises, TUserLessons } from '@/common/models';

export type TTableContentExerciseProps = {
  userExercises?: TUserExercises[];
  userLessons?: TUserLessons[];
  showBadge?: boolean;
  activeId?: string;
};
