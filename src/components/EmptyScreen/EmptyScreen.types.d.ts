import { TButtonProps } from '@/components/Button';
import { StaticImageData } from 'next/image';

export type TEmptyScreenProps = {
  image: string | StaticImageData;
  title: React.ReactNode;
  buttonProps?: TButtonProps;
};
