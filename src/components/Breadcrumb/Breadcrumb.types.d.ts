import React, { CSSProperties } from 'react';

export type TBreadcrumbProps = {
  className?: string;
  options: TBreadcrumbData[];
  separator?: React.ReactNode;
  style?: CSSProperties;
  loading?: boolean;
};

export type TBreadcrumbData = {
  key: string | number;
  href?: string;
  title: React.ReactNode;
  onClick?: () => void;
};
