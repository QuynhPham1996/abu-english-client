import React from 'react';
import { useMediaQuery } from 'react-responsive';
import classNames from 'classnames';

import WrapperLazyLoad from '@/components/WrapperLazyLoad';
import Avatar from '@/components/Avatar';
import Tooltip from '@/components/Tooltip';
import Empty from '@/components/Empty';
import { TNotification } from '@/common/models';
import { formatISODateToDateTime, getFullPath } from '@/utils/functions';
import { EFormat } from '@/common/enums';

import { THeaderNotificationsProps } from './HeaderNotifications.types';

const HeaderNotifications: React.FC<THeaderNotificationsProps> = ({
  data = [],
  onLoadMore,
  onClickNotification,
  onReadNotification,
}) => {
  const isTablet = useMediaQuery({ maxWidth: 991 });

  const isEmpty = data.length === 0;

  return (
    <div className="HeaderNotifications">
      <div className="HeaderNotifications-title">Thông Báo</div>

      {isEmpty ? (
        <Empty />
      ) : (
        <WrapperLazyLoad maxHeight={500} onEnd={onLoadMore}>
          <div className="HeaderNotifications-list">
            {data.map((item) => {
              const notificationData = item.data as TNotification;
              const isUnread = !notificationData?.isRead;

              return (
                <div
                  key={item.value}
                  className={classNames('HeaderNotifications-list-item flex items-start justify-between', {
                    unread: isUnread,
                  })}
                  onClick={(): void => {
                    onClickNotification?.(notificationData);
                    if (!notificationData?.isRead) onReadNotification?.(true, notificationData);
                  }}
                >
                  <div className="HeaderNotifications-list-item-avatar">
                    <Avatar
                      size={isTablet ? 32 : 40}
                      name={notificationData?.fromUser?.name}
                      image={getFullPath(notificationData?.fromUser?.avatar)}
                      textSize="small"
                    />
                  </div>
                  <div className="HeaderNotifications-list-item-info">
                    <div className="HeaderNotifications-list-item-info-title">
                      <strong>{notificationData?.fromUser?.name}</strong> {notificationData?.message}
                    </div>
                    <div className="HeaderNotifications-list-item-info-description capitalize">
                      {formatISODateToDateTime(notificationData?.createdAt, EFormat.FULL_DATE_TIME_STRING)}
                    </div>
                  </div>
                  <div>
                    <Tooltip title={!isUnread ? 'Đánh dấu chưa đọc' : 'Đánh dấu đã đọc'} placement="top">
                      <div
                        className="HeaderNotifications-list-item-read"
                        onClick={(e): void => {
                          e.stopPropagation();
                          onReadNotification?.(!notificationData?.isRead, notificationData);
                        }}
                      />
                    </Tooltip>
                  </div>
                </div>
              );
            })}
          </div>
        </WrapperLazyLoad>
      )}
    </div>
  );
};

export default HeaderNotifications;
