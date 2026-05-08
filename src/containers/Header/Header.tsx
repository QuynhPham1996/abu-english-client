import React, { useState } from 'react';
import { Col, Drawer, DrawerProps, Row } from 'antd';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import Logo from '@/assets/images/logo.png';
import { Paths } from '@/routers/constants';
import Button, { EButtonStyleType } from '@/components/Button';
import { EIconColor, EIconName } from '@/components/Icon';
import Avatar from '@/components/Avatar';
import DropdownMenu, { TDropdownMenuItem } from '@/components/DropdownMenu';
import DropdownCustom from '@/components/DropdownCustom';
import HeaderNotifications from '@/containers/Header/HeaderNotifications';
import ModalLogout from '@/containers/Header/ModalLogout/ModalLogout';
import { useModalState } from '@/utils/hooks';
import { getFullPath, removeParam } from '@/utils/functions';
import { TRootState } from '@/redux/reducers';
import { ENotificationType, EUserRole } from '@/common/enums';
import { EGetNotificationsAction, getNotificationsAction, updateNotificationAction } from '@/redux/actions';
import { usePaginationLoadMoreOptionTool } from '@/utils/hooks';
import { TNotification } from '@/common/models';
import { TGetNotificationsResponse } from '@/services/api';
import ModalAddCourses from '@/containers/ModalAddCourses';

import { THeaderProps } from './Header.types.d';
import { dataHeaderMenu } from './Header.data';

const AntdDrawerModify: React.FC<DrawerProps & { children?: React.ReactNode }> = Drawer;

const MediaQuery = dynamic(() => import('react-responsive'), {
  ssr: false,
});

const Header: React.FC<THeaderProps> = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { asPath } = router;

  const [visibleNotificationDropdown, setVisibleNotificationDropdown] = useState<boolean>(false);
  const [modalLogoutState, handleOpenModalLogout, handleCloseModalLogout] = useModalState();
  const [drawerMenuMobileState, handleOpenDrawerMenuMobile, handleCloseDrawerMenuMobile] = useModalState();

  const myProfileState = useSelector((state: TRootState) => state.userReducer.getMyProfileResponse)?.data;
  const isManager = [EUserRole.MANAGER, EUserRole.SUPER_ADMIN].includes(myProfileState?.role as EUserRole);

  const [addCoursesModalState, handleOpenAddCoursesModal, handleCloseAddCoursesModal] = useModalState();

  const dataLocation = {
    id: router?.query?.id,
    exerciseId: router?.query?.exerciseId,
    isAdmin: isManager,
  };

  const dataHeaderAccountMenu: TDropdownMenuItem[] = [
    {
      value: 'profile',
      label: 'Thông tin cá nhân',
      icon: EIconName.User,
      active: removeParam(asPath) === Paths.Profile,
      onClick: (): void => {
        router.push(Paths.Profile);
      },
    },
    {
      value: 'logout',
      label: 'Đăng xuất',
      danger: true,
      icon: EIconName.Power,
      onClick: (): void => {
        handleOpenModalLogout();
      },
    },
  ];

  const {
    options: notificationsOptions,
    setOptions: setNotificationsOptions,
    handleLoadMore: handleLoadMoreNotifications,
    state: notificationsState,
  } = usePaginationLoadMoreOptionTool({
    actions: getNotificationsAction,
    reducer: 'notificationReducer',
    response: 'getNotificationsResponse',
    loadingAction: EGetNotificationsAction.GET_NOTIFICATIONS,
    initialParams: {},
    availableToCall: Boolean(myProfileState?.id),
  });

  const showTotalNotification = (): string | undefined => {
    const total = (notificationsState as TGetNotificationsResponse)?.totalUnread;

    if (!total) return undefined;
    if (total >= 100) return '99+';
    return String(total);
  };

  const handleClickNotification = (data: TNotification): void => {
    switch (data?.type) {
      case ENotificationType.REGISTER_COURSE: {
        handleOpenAddCoursesModal(data?.fromUser, { dataCourse: data?.data?.course });
        break;
      }
      case ENotificationType.RETURN_EXERCISE:
      case ENotificationType.SUBMIT_EXERCISE: {
        router.push(Paths.ExerciseDetail(data?.data?.test?.id));
        setVisibleNotificationDropdown(false);
        break;
      }
      default:
        break;
    }
  };

  const handleReadNotification = (isRead: boolean, data: TNotification): void => {
    const newData = notificationsOptions.map((item) => {
      if (item?.data?.id === data?.id) {
        return {
          ...item,
          data: {
            ...item.data,
            isRead,
          },
        };
      }

      return item;
    });
    setNotificationsOptions(newData);

    const notificationsStateModify = notificationsState as TGetNotificationsResponse;
    let totalUnread = notificationsStateModify?.totalUnread;

    if (isRead && !data?.isRead) {
      totalUnread = totalUnread - 1;
    }

    if (!isRead && data?.isRead) {
      totalUnread = totalUnread + 1;
    }

    dispatch(
      getNotificationsAction.success({
        ...notificationsStateModify,
        totalUnread,
      }),
    );

    dispatch(updateNotificationAction.request({ paths: { id: data?.id }, body: { isRead } }));
  };

  const renderHeaderListMenu = (): React.ReactNode => {
    return (
      <div className="Header-list">
        <Row gutter={[8, 8]} wrap={false}>
          {dataHeaderMenu(dataLocation)
            .filter((item) => !item.hide)
            .map((item) => (
              <Col key={item.key}>
                <div className="Header-list-item">
                  <Button
                    active={(item.activePaths as string[]).includes(removeParam(asPath))}
                    title={item.title}
                    iconName={item.icon}
                    badge={item.badge}
                    badgeColor={EIconColor.SUNGLOW}
                    badgeTextColor={EIconColor.BLACK}
                    iconColor={EIconColor.PALE_SKY}
                    styleType={EButtonStyleType.WHITE_GRAY}
                    onClick={(): void => {
                      if (item.link) router.push(item.link);
                      handleCloseDrawerMenuMobile();
                    }}
                  />
                </div>
              </Col>
            ))}
        </Row>
      </div>
    );
  };

  return (
    <div className="Header">
      <div className="Header-wrapper">
        <Row align="middle" wrap={false}>
          <MediaQuery maxWidth={991}>
            <Col style={{ paddingRight: 0 }}>
              <Button
                iconName={EIconName.Menu}
                iconColor={EIconColor.SHARK}
                styleType={EButtonStyleType.WHITE}
                onClick={handleOpenDrawerMenuMobile}
              />
            </Col>
          </MediaQuery>

          <Col>
            <Link
              href={myProfileState ? (isManager ? Paths.UsersManagement : Paths.Learn) : Paths.Home}
              className="Header-logo"
            >
              <Image src={Logo} alt="" fill />
            </Link>
          </Col>

          {myProfileState && (
            <>
              <Col flex={1}>
                <MediaQuery minWidth={992}>{renderHeaderListMenu()}</MediaQuery>
              </Col>

              <Col>
                <DropdownCustom
                  overlay={
                    <HeaderNotifications
                      data={notificationsOptions}
                      onLoadMore={handleLoadMoreNotifications}
                      onClickNotification={handleClickNotification}
                      onReadNotification={handleReadNotification}
                    />
                  }
                  placement="bottomRight"
                  visible={visibleNotificationDropdown}
                  onVisibleChange={setVisibleNotificationDropdown}
                >
                  <Button
                    iconName={EIconName.Bell}
                    badge={showTotalNotification()}
                    iconColor={EIconColor.SHARK}
                    styleType={EButtonStyleType.WHITE}
                  />
                </DropdownCustom>
              </Col>
              <Col>
                <div
                  className={classNames('Header-account', { active: [Paths.Profile].includes(removeParam(asPath)) })}
                >
                  <DropdownMenu options={dataHeaderAccountMenu}>
                    <Avatar
                      size={42}
                      image={getFullPath(myProfileState?.avatar)}
                      name={myProfileState?.name}
                      textSize="small"
                    />
                  </DropdownMenu>
                </div>
              </Col>
            </>
          )}
        </Row>
      </div>

      {myProfileState && (
        <>
          <MediaQuery maxWidth={991}>
            <AntdDrawerModify
              {...drawerMenuMobileState}
              className="Header-menu-mobile"
              placement="left"
              title="Điều Hướng"
              onClose={handleCloseDrawerMenuMobile}
              closeIcon={
                <Button
                  iconName={EIconName.X}
                  iconColor={EIconColor.SHARK}
                  styleType={EButtonStyleType.TRANSPARENT_GEYSER}
                />
              }
            >
              {renderHeaderListMenu()}

              <div className="Header-menu-mobile-footer">
                <Link href={Paths.Learn} className="Header-logo">
                  <Image src={Logo} alt="" fill />
                </Link>
                © Bản quyền thuộc về © <br /> Trung tâm đào tạo Tiếng Anh Abu English Club
                <br />
              </div>
            </AntdDrawerModify>
          </MediaQuery>

          <ModalLogout {...modalLogoutState} onClose={handleCloseModalLogout} />
        </>
      )}

      <ModalAddCourses
        {...addCoursesModalState}
        onClose={handleCloseAddCoursesModal}
        onSuccess={(): void => {
          router.push(Paths.UsersManagement);
        }}
      />
    </div>
  );
};

export default Header;
