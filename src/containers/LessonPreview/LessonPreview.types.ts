import { TQuestion } from '@/common/models';

export type TPreviewLesson = {
  id?: string;
  name?: string;
  type?: string;
  arrange?: string;
  questions?: TQuestion[];
  exercise?: {
    name?: string;
  };
};

export type TDoExerciseData = Omit<TQuestion, 'children'> & {
  data?: string;
  children?: TDoExerciseData[];
};

export type TLessonPreviewProps = {
  title?: string;
  lessons?: TPreviewLesson[];
  lessonId?: string;
  loading?: boolean;
  preview?: boolean;
  onChangeLesson?: (lessonId: string) => void;
  onSubmit?: (questions: TDoExerciseData[], duration: number) => void;
};
