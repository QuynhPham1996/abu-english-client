import React from 'react';
import { Tooltip as AntdTooltip } from 'antd';
import classNames from 'classnames';

import { TTooltipProps } from './Tooltip.types';

const Tooltip: React.FC<TTooltipProps> = ({
  title,
  placement,
  className,
  overlayClassName,
  trigger,
  children,
  getPopupContainer,
}) => {
  return (
    <AntdTooltip
      className={classNames('Tooltip', className)}
      title={title}
      trigger={trigger}
      placement={placement}
      getPopupContainer={getPopupContainer}
      overlayClassName={classNames('Tooltip-overlay', overlayClassName)}
    >
      <div className="Tooltip-wrapper">{children}</div>
    </AntdTooltip>
  );
};

export default Tooltip;
