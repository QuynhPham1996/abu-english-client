import React from 'react';
import classNames from 'classnames';

import Icon, { EIconColor, EIconName } from '@/components/Icon';

import { THelpBadgeProps } from './HelpBadge.types.d';

const HelpBadge: React.FC<THelpBadgeProps> = ({ type, iconName, title }) => {
  return (
    <div className={classNames('HelpBadge flex items-start', type)}>
      <Icon name={iconName || EIconName.InfoCircle} color={EIconColor.SHARK} />
      {title}
    </div>
  );
};

export default HelpBadge;
