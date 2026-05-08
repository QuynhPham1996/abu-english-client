export type TModalCropImageProps = TCropImageProps & {
  visible: boolean;
  data?: any;
  onClose?: () => void;
  onSuccess?: (data?: any) => void;
};

export type TCropImageProps = {
  aspect?: number;
};
