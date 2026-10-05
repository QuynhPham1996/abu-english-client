import { TExercise, TLesson } from '@/common/models';

export type TModalGroupQuestionFormProps = {
  visible: boolean;
  data?: TLesson;
  dataExercise?: TExercise;
  dataCourse?: { id?: string };
  onClose?: () => void;
  onSuccess?: () => void;
};
