import { EUserRole } from '@/common/enums';
import { TUser } from '@/common/models';

export type TModalUserFormProps = {
  visible: boolean;
  data?: TUser;
  role?: EUserRole;
  onClose?: () => void;
  onSuccess?: () => void;
};
