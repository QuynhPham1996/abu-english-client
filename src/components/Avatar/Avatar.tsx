import React, { useEffect, useState } from 'react';
import { Avatar as AntdAvatar } from 'antd';
import classNames from 'classnames';

import { renderAvatarString } from '@/utils/functions';

import { TAvatarProps } from './Avatar.types';

const Avatar: React.FC<TAvatarProps> = ({ image, size, name, textSize, shape, className, onClick }) => {
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
  }, [image]);

  return (
    <div className={classNames('Avatar', textSize, className, { 'onclick': onClick })} onClick={onClick}>
      <AntdAvatar
        size={size}
        shape={shape}
        src={isError ? undefined : image || undefined}
        onError={(): boolean => {
          setIsError(true);
          return true;
        }}
      >
        {renderAvatarString(name)}
      </AntdAvatar>
    </div>
  );
};

export default Avatar;
