import { TQuestion } from '@/common/models';

export type TModalDeleteQuestionBankProps = {
  visible: boolean;
  data?: TQuestion;
  onClose?: () => void;
  onSuccess?: () => void;
};
