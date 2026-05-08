import React from 'react';

import Icon, { EIconColor, EIconName } from '@/components/Icon';

import { TEmptyProps } from './Empty.types.d';

const Empty: React.FC<TEmptyProps> = () => {
  return (
    <div className="Empty flex flex-col items-center justify-center nowrap">
      <Icon name={EIconName.MoodEmpty} color={EIconColor.SHARK} />
      <span>Không có dữ liệu !</span>
    </div>
  );
};

export default Empty;
