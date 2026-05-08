import { SizeType } from 'antd/lib/config-provider/SizeContext';

import { EIconName } from '@/components/Icon';

export type TSelectProps = {
  className?: string;
  placeholder?: string;
  value?: TSelectOption;
  options?: TSelectOption[];
  showSearch?: boolean;
  disabled?: boolean;
  size?: SizeType;
  loading?: boolean;
  defaultValue?: TSelectOption;
  allowClear?: boolean;
  dropdownClassName?: string;
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';
  readOnlyText?: boolean;
  suffixIcon?: EIconName;
  onSearch?: (keyword: string) => void;
  onLoadMore?: () => void;
  onChange?: (option: TSelectOption | null) => void;
};

export type TSelectOption = {
  label: string;
  value: string;
  hide?: boolean;
  data?: any;
  disabled?: boolean;
};
