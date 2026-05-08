import { SizeType } from 'antd/lib/config-provider/SizeContext';

import { EIconName } from '@/components/Icon';
import { TSelectOption } from '@/components/Select';

export type TSelectMultipleProps = {
  className?: string;
  placeholder?: string;
  value?: TSelectOption[];
  options?: TSelectOption[];
  showSearch?: boolean;
  disabled?: boolean;
  size?: SizeType;
  defaultValue?: TSelectOption[];
  allowClear?: boolean;
  dropdownClassName?: string;
  readOnlyText?: boolean;
  suffixIcon?: EIconName;
  loading?: boolean;
  onSearch?: (keyword: string) => void;
  onLoadMore?: () => void;
  onChange?: (option: TSelectOption[] | null) => void;
};
