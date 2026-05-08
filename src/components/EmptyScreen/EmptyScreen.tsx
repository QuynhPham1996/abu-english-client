import React from 'react';
import Image from 'next/image';

import Button, { EButtonStyleType } from '@/components/Button';

import { TEmptyScreenProps } from './EmptyScreen.types.d';

const EmptyScreen: React.FC<TEmptyScreenProps> = ({ image, title, buttonProps }) => {
  return (
    <div className="EmptyScreen flex items-center justify-center flex-col">
      <div className="EmptyScreen-image">
        <Image src={image} alt="" fill />
      </div>
      <div className="EmptyScreen-title">{title}</div>

      {buttonProps && (
        <div className="EmptyScreen-btn flex justify-center">
          <Button styleType={EButtonStyleType.PRIMARY} {...buttonProps} />
        </div>
      )}
    </div>
  );
};

export default EmptyScreen;
