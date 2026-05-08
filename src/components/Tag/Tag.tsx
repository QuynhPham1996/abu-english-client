import React from 'react';
import classNames from 'classnames';

import Icon from '@/components/Icon';

import { TTagProps } from './Tag.types.d';

const Tag: React.FC<TTagProps> = ({ iconName, iconColor, title, size, type, onClick }) => {
  return (
    <div className={classNames('Tag', size, type, { 'cursor-pointer': onClick })} onClick={onClick}>
      {iconName && (
        <div className="Tag-icon">
          <Icon name={iconName} color={iconColor} />
        </div>
      )}
      {title && <div className="Tag-title">{title}</div>}
    </div>
  );
};

export default Tag;
