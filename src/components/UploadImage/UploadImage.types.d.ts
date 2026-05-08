import { TAvatarProps } from '@/components/Avatar';
import { TCropImageProps } from '@/components/UploadImage/ModalCropImage/ModalCropImage.types';
import { SizeType } from 'antd/lib/config-provider/SizeContext';

export type TUploadImageProps = TCropImageProps & {
  value?: any;
  sizeImage?: number;
  shape?: 'circle' | 'square';
  disabled?: boolean;
  autoSize?: boolean;
  avatar?: boolean;
  name?: string;
  textSize?: SizeType;
  removeBackground?: boolean;
  showPlaceholderEdit?: boolean;
  useCrop?: boolean;
  avatarProps?: TAvatarProps;
  onChange?: (value: any) => void;
};
