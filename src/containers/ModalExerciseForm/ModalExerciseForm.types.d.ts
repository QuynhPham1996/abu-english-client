import { TCourse, TExercise } from '@/common/models';

export type TModalExerciseFormProps = {
  visible: boolean;
  data?: TExercise;
  dataCourse?: TCourse;
  onClose?: () => void;
  onSuccess?: () => void;
};
