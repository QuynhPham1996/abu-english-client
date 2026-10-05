import { TQuestion, TQuestionGroup } from '@/common/models';

export type TModalQuestionBankFormProps = {
  visible: boolean;
  data?: TQuestion;
  groups?: TQuestionGroup[];
  lockGroup?: boolean;
  onClose?: () => void;
  onSuccess?: () => void;
};
