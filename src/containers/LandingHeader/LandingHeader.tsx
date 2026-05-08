import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Drawer, DrawerProps } from 'antd';
import dynamic from 'next/dynamic';

import { Paths } from '@/routers/constants';
import Logo from '@/assets/images/logo.png';
import Button, { EButtonStyleType } from '@/components/Button';
import { EIconColor, EIconName } from '@/components/Icon';
import { useModalState } from '@/utils/hooks';

import { TLandingHeaderProps } from './LandingHeader.types.d';

const AntdDrawerModify: React.FC<DrawerProps & { children?: React.ReactNode }> = Drawer;

const MediaQuery = dynamic(() => import('react-responsive'), {
  ssr: false,
});

const LandingHeader: React.FC<TLandingHeaderProps> = () => {
  const [drawerMenuMobileState, handleOpenDrawerMenuMobile, handleCloseDrawerMenuMobile] = useModalState();

  const dataHeaderMenu = [
    {
      key: 'benefit',
      title: 'Ưu điểm',
      link: '#benefit',
    },
    {
      key: 'courses',
      title: 'Khoá học',
      link: '#courses',
    },
    {
      key: 'contact',
      title: 'Liên hệ',
      link: '#contact',
    },
  ];

  const handleClickLink = (idTarget: string): void => {
    const target = document.querySelector(`${idTarget}`) as any;
    if (target) {
      window.scrollTo({ top: target.offsetTop - 40, behavior: 'smooth' });
    }
  };

  const renderButtonsLink = (): React.ReactNode => (
    <div className="LandingHeader-actions flex items-center">
      <Button
        title="Học thử miễn phí"
        styleType={EButtonStyleType.PRIMARY}
        iconName={EIconName.Book}
        iconColor={EIconColor.WHITE}
        link="https://www.m.me/61552926075305"
        targetLink="_blank"
      />
      <Button
        title="Đăng nhập"
        styleType={EButtonStyleType.OUTLINE_GERALDINE}
        iconName={EIconName.Key}
        iconColor={EIconColor.GERALDINE}
        link={Paths.Login}
      />
    </div>
  );

  const renderListMenu = (): React.ReactNode => (
    <ul className="LandingHeader-list flex items-center">
      {dataHeaderMenu.map((item) => (
        <li key={item.key} className="LandingHeader-list-item">
          <a
            href={item.link}
            onClick={(e): void => {
              e.preventDefault();
              handleClickLink(item.link);
              handleCloseDrawerMenuMobile();
            }}
          >
            {item.title}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="LandingHeader">
      <div className="container">
        <div className="LandingHeader-wrapper flex items-center justify-between">
          <Link href={Paths.Home} className="LandingHeader-logo">
            <Image src={Logo} alt="" />
          </Link>

          <MediaQuery minWidth={992}>
            {renderListMenu()}
            {renderButtonsLink()}
          </MediaQuery>

          <MediaQuery maxWidth={991}>
            <Button
              styleType={EButtonStyleType.OUTLINE_GERALDINE}
              iconName={EIconName.Menu}
              iconColor={EIconColor.GERALDINE}
              onClick={handleOpenDrawerMenuMobile}
            />
          </MediaQuery>
        </div>
      </div>

      <MediaQuery maxWidth={991}>
        <AntdDrawerModify
          placement="left"
          title="Điều Hướng"
          className="LandingHeader-menu-mobile"
          {...drawerMenuMobileState}
          onClose={handleCloseDrawerMenuMobile}
          closeIcon={
            <Button
              iconName={EIconName.X}
              iconColor={EIconColor.SHARK}
              styleType={EButtonStyleType.TRANSPARENT_GEYSER}
            />
          }
        >
          <div className="LandingHeader-menu-mobile-wrapper">
            {renderListMenu()}
            {renderButtonsLink()}
          </div>
        </AntdDrawerModify>
      </MediaQuery>
    </div>
  );
};

export default LandingHeader;
