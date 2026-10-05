import { TQuestionGroup } from '@/common/models';

export type TModalDeleteQuestionGroupProps = {
  visible: boolean;
  data?: TQuestionGroup;
  onClose?: () => void;
  onSuccess?: () => void;
};
