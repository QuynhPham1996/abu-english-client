import React from 'react';
import { EHelpBadgeType } from '@/components/HelpBadge/HelpBadge.enums';
import { EIconName } from '@/components/Icon';

export type THelpBadgeProps = {
  type: EHelpBadgeType;
  title: React.ReactNode;
  iconName?: EIconName;
};
