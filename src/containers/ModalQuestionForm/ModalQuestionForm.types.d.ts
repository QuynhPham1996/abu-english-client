import { TLesson, TQuestion } from '@/common/models';

export type TModalQuestionFormProps = {
  visible: boolean;
  data?: TQuestion;
  dataLesson?: TLesson;
  onClose?: () => void;
  onSuccess?: () => void;
};
