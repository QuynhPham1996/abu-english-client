import { TQuestionGroup } from '@/common/models';

export type TModalQuestionGroupFormProps = {
  visible: boolean;
  data?: TQuestionGroup;
  zIndex?: number;
  onClose?: () => void;
  onSuccess?: (group?: TQuestionGroup) => void;
};
