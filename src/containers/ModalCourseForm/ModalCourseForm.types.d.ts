import { TCourse } from '@/common/models';

export type TModalCourseFormProps = {
  visible: boolean;
  data?: TCourse;
  onClose?: () => void;
  onSuccess?: () => void;
};
