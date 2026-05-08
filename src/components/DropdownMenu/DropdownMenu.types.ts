import { CSSProperties } from 'react';
import { EIconName } from '@/components/Icon';

export type TDropdownMenuProps = {
  className?: string;
  trigger?: ('click' | 'hover' | 'contextMenu')[];
  options?: TDropdownMenuItem[];
  placement?: 'topLeft' | 'topCenter' | 'topRight' | 'bottomLeft' | 'bottomCenter' | 'bottomRight' | 'top' | 'bottom';
  disabled?: boolean;
  overlayClassName?: string;
  children?: React.ReactNode;
  overlayStyle?: CSSProperties;
  getPopupContainer?: (container: HTMLElement) => HTMLElement;
  onVisibleChange?: (visible: boolean) => void;
  onClickMenuItem?: (data: TDropdownMenuItem) => void;
};

export type TDropdownMenuItem = {
  label: string;
  value: string;
  hide?: boolean;
  icon?: EIconName;
  active?: boolean;
  danger?: boolean;
  onClick?: (data: TDropdownMenuItem) => void;
};
