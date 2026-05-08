import { TNotification } from '@/common/models';
import { TSelectOption } from '@/components/Select';

export type THeaderNotificationsProps = {
  data: TSelectOption[];
  onLoadMore?: () => void;
  onClickNotification?: (data: TNotification) => void;
  onReadNotification?: (isRead: boolean, data: TNotification) => void;
};
