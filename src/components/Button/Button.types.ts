import { ButtonType } from 'antd/lib/button';
import { ButtonHTMLType } from 'antd/lib/button/button';
import { SizeType } from 'antd/lib/config-provider/SizeContext';

import { CSSProperties } from 'react';

import { EIconColor, EIconName } from '@/components/Icon';

import { EButtonStyleType } from './Button.enums';

export type TButtonProps = {
  className?: string;
  title?: string;
  type?: ButtonType;
  htmlType?: ButtonHTMLType;
  size?: SizeType;
  styleType?: EButtonStyleType;
  iconName?: EIconName;
  danger?: boolean;
  link?: string;
  iconColor?: EIconColor;
  reverse?: boolean;
  disabled?: boolean;
  loading?: boolean;
  active?: boolean;
  badge?: React.ReactNode;
  badgeColor?: EIconColor;
  badgeTextColor?: EIconColor;
  style?: CSSProperties;
  targetLink?: '_self' | '_blank' | '_idTarget';
  idTarget?: string;
  onClick?: () => void;
};
