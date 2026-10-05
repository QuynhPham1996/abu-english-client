import { TAssignment, TLesson } from '@/common/models';

export type TModalPickQuestionGroupProps = {
  visible: boolean;
  assignment?: TAssignment;
  lesson?: TLesson;
  onClose?: () => void;
  onSuccess?: () => void;
};
