import React from 'react';
import { Breadcrumb as AntdBreadcrumb, BreadcrumbItemProps, BreadcrumbProps, Skeleton } from 'antd';
import classNames from 'classnames';
import { useRouter } from 'next/router';

import Icon, { EIconColor, EIconName } from '@/components/Icon';

import { TBreadcrumbProps } from './Breadcrumb.types.d';

const { Item } = AntdBreadcrumb;

const AntdBreadcrumbModify: React.FC<BreadcrumbProps & { children?: React.ReactNode }> = AntdBreadcrumb;
const AntdItemBreadcrumbModify: React.FC<BreadcrumbItemProps & { children?: React.ReactNode }> = Item;

const Breadcrumb: React.FC<TBreadcrumbProps> = ({ loading, className, options = [], separator, style }) => {
  const router = useRouter();
  const { asPath } = router;

  return loading ? (
    <div style={style}>
      <Skeleton active title={false} paragraph={{ rows: 1, width: '100%' }} style={{ width: 320 }} />
    </div>
  ) : (
    <AntdBreadcrumbModify
      style={style}
      className={classNames('Breadcrumb', className)}
      separator={separator || <Icon name={EIconName.AngleRight} color={EIconColor.BLACK} />}
    >
      {options.map((option) => (
        <AntdItemBreadcrumbModify
          key={option.key}
          onClick={(): void => {
            if (option.href) router.push(option.href);
            option.onClick?.();
          }}
          className={classNames('ant-breadcrumb-link', { active: asPath === option.href })}
        >
          {option.title}
        </AntdItemBreadcrumbModify>
      ))}
    </AntdBreadcrumbModify>
  );
};

export default Breadcrumb;
