import React from 'react';
import { Dropdown as AntdDropdown } from 'antd';
import classNames from 'classnames';

import Icon, { EIconColor } from '@/components/Icon';

import { TDropdownMenuProps } from './DropdownMenu.types';

const DropdownMenu: React.FC<TDropdownMenuProps> = ({
  children,
  trigger,
  placement,
  overlayClassName,
  options = [],
  disabled,
  overlayStyle,
  getPopupContainer,
  onClickMenuItem,
  onVisibleChange,
}) => {
  const handleVisibleChange = (currentVisible: boolean): void => {
    onVisibleChange?.(currentVisible);
  };

  const renderDropdownMenuOverlay = (): React.ReactElement => {
    return (
      <div className="DropdownMenu-list">
        {options
          .filter((item) => !item.hide)
          .map((item) => (
            <div
              key={item.value}
              className={classNames('DropdownMenu-list-item flex items-center', {
                danger: item.danger,
                active: item.active,
              })}
              onClick={(): void => {
                item.onClick?.(item);
                onClickMenuItem?.(item);
              }}
            >
              {item.icon && (
                <div className="DropdownMenu-list-item-icon">
                  <Icon name={item.icon} color={EIconColor.BLACK} />
                </div>
              )}

              {item.label}
            </div>
          ))}
      </div>
    );
  };

  const antdDropdownProps = {
    overlay: renderDropdownMenuOverlay(),
    overlayStyle,
    getPopupContainer,
    placement,
    disabled,
    overlayClassName: classNames('DropdownMenu-overlay', overlayClassName),
    trigger: trigger || ['click'],
    onVisibleChange: handleVisibleChange,
  };

  return (
    <div className="DropdownMenu">
      <AntdDropdown {...antdDropdownProps}>
        <div className="DropdownMenu-wrapper">{children}</div>
      </AntdDropdown>
    </div>
  );
};

export default DropdownMenu;
