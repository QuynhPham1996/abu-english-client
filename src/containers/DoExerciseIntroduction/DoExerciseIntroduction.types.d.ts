import type { TPreviewLesson } from '@/containers/LessonPreview';

export type TDoExerciseIntroductionProps = {
  onStart?: () => void;
  lesson?: TPreviewLesson;
};
