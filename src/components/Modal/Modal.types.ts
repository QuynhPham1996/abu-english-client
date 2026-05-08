import { TButtonProps } from '@/components/Button';

export type TModalProps = {
  className?: string;
  wrapClassName?: string;
  visible: boolean;
  width?: string | number;
  centered?: boolean;
  cancelButton?: TButtonProps;
  confirmButton?: TButtonProps;
  closeable?: boolean;
  title?: React.ReactNode;
  hideFooter?: boolean;
  loading?: boolean;
  showActions?: boolean;
  zIndex?: number;
  children?: React.ReactNode;
  onClose?: () => void;
  onSubmit?: () => void;
};
