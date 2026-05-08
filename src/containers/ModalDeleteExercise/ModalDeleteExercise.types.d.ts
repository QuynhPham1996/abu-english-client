import { TExercise } from '@/common/models';

export type TModalDeleteExerciseProps = {
  visible: boolean;
  data?: TExercise;
  onClose?: () => void;
  onSuccess?: () => void;
};
