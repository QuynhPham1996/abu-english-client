import { TExercise } from '@/common/models';

export type TModalUploadExerciseVideoProps = {
  visible: boolean;
  data?: TExercise;
  onClose?: () => void;
  onSuccess?: () => void;
};
