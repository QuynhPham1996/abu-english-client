import { TLesson } from '@/common/models';

export type TModalDeleteGroupQuestionProps = {
  visible: boolean;
  data?: TLesson;
  onClose?: () => void;
  onSuccess?: () => void;
};
