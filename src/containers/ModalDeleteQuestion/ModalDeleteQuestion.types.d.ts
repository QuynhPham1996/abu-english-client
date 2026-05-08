import { TQuestion } from '@/common/models';

export type TModalDeleteQuestionProps = {
  visible: boolean;
  data?: TQuestion;
  onClose?: () => void;
  onSuccess?: () => void;
};
