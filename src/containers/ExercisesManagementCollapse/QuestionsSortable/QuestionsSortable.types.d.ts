import { ELessonArrange } from '@/common/enums';
import { TLesson, TQuestion } from '@/common/models';

export type TQuestionsSortableProps = {
  data?: TQuestion[];
  dataLesson?: TLesson;
  onItemDelete?: (data: TQuestion) => void;
  onItemEdit?: (data: TQuestion) => void;
};
