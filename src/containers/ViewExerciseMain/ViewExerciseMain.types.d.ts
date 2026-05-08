import { TQuestion } from '@/common/models';

export type TViewExerciseMainProps = unknown;

export type TDoExerciseData = TQuestion & {
  data?: any;
  isCorrect?: boolean;
};
