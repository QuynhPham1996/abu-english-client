import Slider from 'react-slick';

export type TCarouselsProps = {
  dots?: boolean;
  arrows?: boolean;
  infinite?: boolean;
  className?: string;
  slidesToShow?: number;
  slidesToScroll?: number;
  autoplay?: boolean;
  slidesPerRow?: number;
  responsive?: Array<any>;
  adaptiveHeight?: boolean;
  variableWidth?: boolean;
  children?: React.ReactNode;
  onInit?: (data: Slider) => void;
  onDragging?: (dragging: boolean) => void;
  onBeforeChange?: (oldIndex: number, newIndex: number) => void;
  onAfterChange?: (newIndex: number) => void;
};
