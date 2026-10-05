import { TAssignment, TLesson } from '@/common/models';

export type TModalPickBankQuestionsProps = {
  visible: boolean;
  assignment?: TAssignment;
  lesson?: TLesson;
  onClose?: () => void;
  onSuccess?: () => void;
};
