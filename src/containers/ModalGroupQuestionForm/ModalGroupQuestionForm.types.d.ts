import { TExercise, TLesson } from '@/common/models';

export type TModalGroupQuestionFormProps = {
  visible: boolean;
  data?: TLesson;
  dataExercise?: TExercise;
  onClose?: () => void;
  onSuccess?: () => void;
};
