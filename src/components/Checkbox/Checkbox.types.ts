import React from 'react';
import { SizeType } from 'antd/lib/config-provider/SizeContext';

export type TCheckboxProps = {
  className?: string;
  size?: SizeType
  label?: React.ReactNode;
  value?: boolean;
  onChange?: (checked: boolean) => void;
};
