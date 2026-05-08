import React, { useEffect, useState } from 'react';
import { Select as AntdSelect } from 'antd';
import classNames from 'classnames';

import { searchString } from '@/utils/functions';
import { useDebounce } from '@/utils/hooks';
import { ETimeoutDebounce } from '@/common/enums';
import WrapperLazyLoad from '@/components/WrapperLazyLoad';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import Empty from '@/components/Empty';
import Loading from '@/components/Loading';

import { TSelectMultipleProps } from './SelectMultiple.types';

const SelectMultiple: React.FC<TSelectMultipleProps> = ({
  placeholder = 'Chọn dữ liệu',
  disabled,
  options = [],
  showSearch,
  value,
  className,
  defaultValue,
  allowClear,
  dropdownClassName,
  readOnlyText,
  suffixIcon,
  size,
  loading,
  onSearch,
  onLoadMore,
  onChange,
}) => {
  const [keyword, setKeyword] = useState<string>('');
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const searchValueDebounce = useDebounce(keyword, ETimeoutDebounce.SEARCH);

  const filterOption = (input: string, option: any): boolean => {
    return searchString(option.label, keyword);
  };

  const handleSearch = (keywordValue: string): void => {
    setKeyword(keywordValue);
  };

  const dropdownRender = (menu: React.ReactElement): React.ReactElement => {
    return (
      <div className={classNames(dropdownClassName)}>
        <div className="SelectMultiple-dropdown-main">
          {loading && (
            <div className="SelectMultiple-dropdown-loading flex items-center justify-center">
              <Loading />
            </div>
          )}

          <WrapperLazyLoad maxHeight={256} onEnd={handleScrollEnd}>
            {menu}
          </WrapperLazyLoad>
        </div>
      </div>
    );
  };

  const handleScrollEnd = (): void => {
    if (onLoadMore) {
      onLoadMore?.();
    }
  };

  const handleClear = (): void => {
    onChange?.(null);
  };

  useEffect(() => {
    if (isMounted && onSearch) {
      onSearch?.(searchValueDebounce);
    }

    setIsMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValueDebounce]);

  return (
    <div className={classNames('SelectMultiple', className, { 'readonly-text': readOnlyText })}>
      <AntdSelect
        className="SelectMultiple-control"
        mode="tags"
        size={size}
        value={value}
        showSearch={onSearch && showSearch}
        placeholder={placeholder}
        defaultValue={defaultValue}
        labelInValue
        allowClear={allowClear}
        filterOption={onSearch ? false : filterOption}
        onSearch={showSearch ? handleSearch : undefined}
        options={options}
        suffixIcon={
          suffixIcon ? (
            <Icon name={suffixIcon} color={EIconColor.BLACK} />
          ) : (
            !readOnlyText && <Icon name={EIconName.AngleDown} color={EIconColor.BLACK} />
          )
        }
        searchValue={keyword}
        dropdownClassName={classNames('SelectMultiple-dropdown', dropdownClassName)}
        getPopupContainer={(trigger: HTMLElement): HTMLElement => trigger}
        onChange={onChange}
        onClear={handleClear}
        dropdownRender={dropdownRender}
        disabled={disabled}
        virtual={false}
        notFoundContent={<Empty />}
      />
    </div>
  );
};

export default SelectMultiple;
