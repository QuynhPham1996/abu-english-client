import { TooltipPlacement } from 'antd/lib/tooltip';

export type TTooltipProps = {
  className?: string;
  title: string;
  overlayClassName?: string;
  getPopupContainer?: (trigger: HTMLElement) => HTMLElement;
  placement?: TooltipPlacement;
  trigger?: string[];
  children?: React.ReactNode;
};
