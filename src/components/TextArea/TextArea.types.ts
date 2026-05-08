import React, { ChangeEvent } from 'react';

import { SizeType } from 'antd/lib/config-provider/SizeContext';

export type TTextAreaProps = {
  className?: string;
  placeholder?: string;
  type?: 'text' | 'password';
  value?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  size?: SizeType;
  editable?: boolean;
  autoSize?: boolean;
  maxLength?: number;
  showCount?: boolean;
  onChange?: (e: string) => void;
};
