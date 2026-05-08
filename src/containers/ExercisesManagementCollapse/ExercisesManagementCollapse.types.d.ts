import { TLesson, TQuestion } from '@/common/models';

export type TExercisesManagementCollapseProps = {
  data?: TLesson[];
  onItemDelete?: (data?: TQuestion, dataModal: { dataLesson: TLesson }) => void;
  onItemEdit?: (data?: TQuestion, dataModal: { dataLesson: TLesson }) => void;
  onItemCreate?: (data?: TQuestion, dataModal: { dataLesson: TLesson }) => void;
  onGroupItemEdit?: (data?: TLesson) => void;
  onGroupItemDelete?: (data?: TLesson) => void;
};
