import { TCourse } from '@/common/models';

export type TModalDeleteCourseProps = {
  visible: boolean;
  data?: TCourse;
  onClose?: () => void;
  onSuccess?: () => void;
};
