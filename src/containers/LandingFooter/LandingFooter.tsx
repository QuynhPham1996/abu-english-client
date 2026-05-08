import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { Paths } from '@/routers/constants';
import LogoWhite from '@/assets/images/logo-white.png';
import Icon, { EIconName } from '@/components/Icon';

import { TLandingFooterProps } from './LandingFooter.types.d';

const LandingFooter: React.FC<TLandingFooterProps> = () => {
  return (
    <div className="LandingFooter">
      <div className="container">
        <div className="LandingFooter-wrapper flex items-center justify-between">
          <Link href={Paths.Home} className="LandingFooter-logo">
            <Image src={LogoWhite} alt="" />
          </Link>
          <div className="LandingFooter-address">
            Hotline: <a href={`tel: 0366278338`}>(+84) 366 278 338</a>
            <br />
            Địa chỉ: Hoàng Mai, Hà Nội
            <br />
            Email: <a href={`mailto: abu.englishclub@gmail.com`}>abu.englishclub@gmail.com</a>
          </div>
          <div className="LandingFooter-socials flex items-center">
            Mạng xã hội
            <Link className="LandingFooter-socials-item" href="https://www.facebook.com/profile.php?id=61552926075305" target="_blank">
              <Icon name={EIconName.Facebook} />
            </Link>
            <Link className="LandingFooter-socials-item" href="https://www.m.me/61552926075305" target="_blank">
              <Icon name={EIconName.Messenger} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingFooter;
