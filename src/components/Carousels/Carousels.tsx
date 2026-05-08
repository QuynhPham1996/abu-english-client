import React, { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import classNames from 'classnames';

import Button, { EButtonStyleType } from '@/components/Button';
import { EIconColor, EIconName } from '@/components/Icon';

import { TCarouselsProps } from './Carousels.types';

const Carousels: React.FC<TCarouselsProps> = ({
  dots = true,
  arrows = true,
  infinite = true,
  slidesToShow = 1,
  slidesToScroll = 1,
  slidesPerRow = 1,
  adaptiveHeight = false,
  responsive = [],
  autoplay,
  variableWidth = false,
  children,
  className,
  onInit,
  onDragging,
  onBeforeChange,
  onAfterChange,
}) => {
  const SlickSlider: any = Slider;
  const slickRef = useRef<Slider>(null);

  const renderPrevArrow = (): React.ReactElement => {
    return (
      <Button
        iconName={EIconName.AngleLeft}
        iconColor={EIconColor.BLACK}
        styleType={EButtonStyleType.WHITE}
        className="Carousels-arrow prev"
      />
    );
  };

  const renderNextArrow = (): React.ReactElement => {
    return (
      <Button
        iconName={EIconName.AngleRight}
        iconColor={EIconColor.BLACK}
        styleType={EButtonStyleType.WHITE}
        className="Carousels-arrow next"
      />
    );
  };

  const settings = {
    speed: 500,
    dots,
    arrows,
    infinite,
    autoplay,
    slidesPerRow,
    adaptiveHeight,
    autoplaySpeed: 4000,
    slidesToShow,
    slidesToScroll,
    responsive,
    variableWidth,
    nextArrow: renderNextArrow(),
    prevArrow: renderPrevArrow(),
    beforeChange: (oldIndex: number, newIndex: number): void => {
      onDragging?.(true);
      onBeforeChange?.(oldIndex, newIndex);
    },
    afterChange: (newIndex: number): void => {
      onDragging?.(false);
      onAfterChange?.(newIndex);
    },
  };

  useEffect(() => {
    if (slickRef?.current) {
      onInit?.(slickRef.current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slickRef]);

  return (
    <div className={classNames('Carousels', className)}>
      <SlickSlider ref={slickRef} swipeToSlide {...settings}>
        {children}
      </SlickSlider>
    </div>
  );
};

export default Carousels;
