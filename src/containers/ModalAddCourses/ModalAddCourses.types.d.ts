import { TCourse, TUser } from '@/common/models';

export type TModalAddCoursesProps = {
  visible: boolean;
  data?: TUser;
  dataCourse?: TCourse;
  onClose?: () => void;
  onSuccess?: () => void;
};
