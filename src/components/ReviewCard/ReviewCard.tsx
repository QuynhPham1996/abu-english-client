import React from 'react';
import Image from 'next/image';

import Icon, { EIconColor, EIconName } from '@/components/Icon';
import ImageAvatarDefault from '@/assets/images/image-avatar-default.png';

import { TReviewCardProps } from './ReviewCard.types.d';

const ReviewCard: React.FC<TReviewCardProps> = ({ title, subtitle, content, name }) => {
  return (
    <div className="ReviewCard">
      <div className="ReviewCard-wrapper">
        <div className="ReviewCard-title">{title}</div>
        <div className="ReviewCard-quote">
          <Icon name={EIconName.Quote} color={EIconColor.GERALDINE} />
        </div>
        <div className="ReviewCard-description">{content}</div>
        <div className="ReviewCard-user flex items-center">
          <div className="ReviewCard-user-avatar">
            <Image src={ImageAvatarDefault} alt="" />
            {/* <Avatar size={52} image={ImageAvatarDefault as any} /> */}
          </div>
          <div className="ReviewCard-user-info">
            <div className="ReviewCard-user-info-title">{name}</div>
            <div className="ReviewCard-user-info-description">{subtitle}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
