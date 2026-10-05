import { TAssignment, TLesson, TQuestion } from '@/common/models';

export type TModalQuestionFormProps = {
  visible: boolean;
  data?: TQuestion;
  dataLesson?: TLesson;
  dataAssignment?: TAssignment;
  onClose?: () => void;
  onSuccess?: () => void;
};
