import { TCourse } from '@/common/models';

export type TModalRegisterCourseProps = {
  visible: boolean;
  data?: TCourse;
  onClose?: () => void;
  onSuccess?: () => void;
};
