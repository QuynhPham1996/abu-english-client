import { TUser } from '@/common/models';

export type TModalSendNotificationProps = {
  visible: boolean;
  data?: TUser;
  onClose?: () => void;
  onSuccess?: () => void;
};
