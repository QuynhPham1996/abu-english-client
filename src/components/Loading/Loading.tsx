import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

import { EIconColor } from '@/components/Icon';

import { TLoadingProps } from './Loading.types';

const Loading: React.FC<TLoadingProps> = ({ size = 24, color = EIconColor.GERALDINE }) => {
  return (
    <Spin
      className="Loading"
      style={{ width: size, height: size }}
      indicator={<LoadingOutlined style={{ fontSize: size, color }} spin />}
    />
  );
};

export default Loading;
