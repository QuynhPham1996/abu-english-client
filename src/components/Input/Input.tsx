import React, { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Input as AntdInput, InputRef } from 'antd';

import { TInputProps } from '@/components/Input/Input.types';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import { ETimeoutDebounce } from '@/common/enums';
import { useDebounce } from '@/utils/hooks';
import { formatNumberWithCommas } from '@/utils/functions';

const Input: React.FC<TInputProps> = ({
  className,
  type,
  size,
  placeholder = 'Nhập dữ liệu',
  prefix,
  suffix,
  value,
  focusOnMount,
  style,
  editable,
  readOnlyText,
  maxLength = 64,
  numberWithSeperator,
  numberstring,
  numberic,
  useNumber,
  disabled,
  onSearch,
  onBlur,
  onChange,
  onEnter,
}) => {
  const [keyword, setKeyword] = useState<string>('');
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const searchValueDebounce = useDebounce(keyword, ETimeoutDebounce.SEARCH);

  const inputRef = useRef<InputRef>(null);
  const handleKeydown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      onEnter?.(value || keyword);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value: changedValue } = e.target;
    if (onSearch || onEnter) setKeyword(changedValue);

    if (numberic) {
      const reg = numberstring ? /^\d*?\d*$/ : /^\d*\.?\d*$/;
      const isNumbericPass = reg.test(changedValue) || changedValue === '';

      if (useNumber) {
        if (changedValue === '') {
          onChange?.('');
        } else if (numberWithSeperator) {
          onChange?.(Number(changedValue?.replaceAll(/[.,\s]/g, '')));
        } else {
          onChange?.(isNumbericPass ? Number(changedValue) : Number(value) || '');
        }
      } else {
        onChange?.(isNumbericPass ? String(changedValue || '') : String(value || '') || '');
      }
    } else {
      onChange?.(changedValue);
    }
  };

  const commonProps = {
    ref: inputRef,
    size,
    placeholder,
    value:
      numberic && numberWithSeperator && useNumber && typeof value === 'number'
        ? formatNumberWithCommas(Number(value || 0))
        : value,
    prefix,
    suffix,
    maxLength,
    disabled,
    readOnly: readOnlyText,
    onChange: handleChange,
    onKeyDown: handleKeydown,
    onBlur,
  };

  useEffect(() => {
    if (focusOnMount) inputRef?.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) onSearch?.(searchValueDebounce || undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValueDebounce]);

  return (
    <div
      className={classNames('Input', className, { affix: suffix || prefix, editable, 'readonly-text': readOnlyText })}
      style={style}
    >
      {type === 'password' ? (
        <AntdInput.Password
          {...commonProps}
          iconRender={(visible): React.ReactNode => (
            <Icon
              className="cursor-pointer"
              name={visible ? EIconName.EyeClosed : EIconName.Eye}
              color={EIconColor.BLACK}
            />
          )}
        />
      ) : (
        <AntdInput {...commonProps} />
      )}
    </div>
  );
};

export default Input;
