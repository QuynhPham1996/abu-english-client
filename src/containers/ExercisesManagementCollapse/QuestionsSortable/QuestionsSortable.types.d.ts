import { TAssignment, TLesson, TQuestion } from '@/common/models';

export type TQuestionsSortableProps = {
  data?: TQuestion[];
  dataLesson?: TLesson;
  dataAssignment?: TAssignment;
  onItemDelete?: (data: TQuestion) => void;
  onItemEdit?: (data: TQuestion) => void;
};
