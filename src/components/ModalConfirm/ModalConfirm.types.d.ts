import { TButtonProps } from '@/components/Button';

export type TModalConfirmProps = {
  visible: boolean;
  loading?: boolean;
  cancelButton?: TButtonProps;
  confirmButton?: TButtonProps;
  title?: React.ReactNode;
  description?: React.ReactNode;
  hideCancelButton?: boolean;
  onClose?: () => void;
  onSubmit?: () => void;
};
