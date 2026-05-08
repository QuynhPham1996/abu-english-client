import React, { CSSProperties, ChangeEvent } from 'react';

import { SizeType } from 'antd/lib/config-provider/SizeContext';

export type TInputProps = {
  className?: string;
  placeholder?: string;
  type?: 'text' | 'password';
  value?: string | number;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  size?: SizeType;
  style?: CSSProperties;
  focusOnMount?: boolean;
  editable?: boolean;
  readOnlyText?: boolean;
  maxLength?: number;
  numberstring?: boolean;
  numberWithSeperator?: boolean;
  numberic?: boolean;
  useNumber?: boolean;
  disabled?: boolean;
  onBlur?: () => void;
  onEnter?: (value: number | string) => void;
  onSearch?: (keyword?: string) => void;
  onChange?: (value: number | string) => void;
};
