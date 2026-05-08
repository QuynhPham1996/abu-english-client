import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import Avatar from '@/components/Avatar';
import { REGEX } from '@/common/constants';
import Upload from '@/components/Upload/Upload';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import ModalCropImage from '@/components/UploadImage/ModalCropImage';
import { useModalState } from '@/utils/hooks';

import { TUploadImageProps } from './UploadImage.types.d';

const UploadImage: React.FC<TUploadImageProps> = ({
  sizeImage,
  shape = 'square',
  value,
  disabled,
  autoSize = true,
  avatar,
  name,
  textSize,
  removeBackground = true,
  showPlaceholderEdit = true,
  useCrop,
  aspect,
  avatarProps,
  onChange,
}) => {
  const [previewImage, setPreviewImage] = useState<string>();
  const [isChanged, setIsChanged] = useState<boolean>(false);
  const [cropImageModalState, handleOpenCropImageModal, handleCloseCropImageModal] = useModalState();

  const handleUploadChange = (files: FileList | null): void => {
    if (files) {
      const file = Array.from(files)?.[0];

      if (useCrop) {
        handleOpenCropImageModal({ file: URL.createObjectURL(file) });
      } else {
        setPreviewImage(URL.createObjectURL(file));
        setIsChanged(true);
        onChange?.(file);
      }
    }
  };

  const handleCropSuccess = (data: any): void => {
    setPreviewImage(data);
    setIsChanged(true);
    onChange?.(data);
  };

  useEffect(() => {
    if (!isChanged) {
      if (REGEX.url.test(value || '')) {
        setPreviewImage(value);
      } else if ((value as any)?.lastModified) {
        setPreviewImage(URL.createObjectURL(value as any));
      } else {
        setIsChanged(false);
        setPreviewImage('');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div
      className={classNames('UploadImage', {
        'remove-background': removeBackground,
        'auto-size': autoSize && !avatar,
        avatar,
        'uploaded': previewImage,
      })}
      style={{ width: sizeImage, height: sizeImage }}
    >
      <Upload accept=".jpg, .png, .jpeg, .svg, .gif" disabled={disabled} onChange={handleUploadChange}>
        <div className="UploadImage-wrapper">
          {previewImage ? (
            <>
              <Avatar
                className="UploadImage-avatar-preview"
                size={sizeImage}
                shape={shape}
                image={previewImage}
                name={name}
                textSize={textSize}
              />
              {showPlaceholderEdit && (
                <div className={classNames('UploadImage-placeholder flex items-center justify-center', shape)}>
                  <Icon name={EIconName.Pencil} color={EIconColor.WHITE} />
                </div>
              )}
            </>
          ) : (
            <>
              {avatarProps ? (
                <>
                  <Avatar {...avatarProps} />
                  {showPlaceholderEdit && (
                    <div className={classNames('UploadImage-placeholder flex items-center justify-center', shape)}>
                      <Icon name={EIconName.Pencil} color={EIconColor.WHITE} />
                    </div>
                  )}
                </>
              ) : (
                <div className={classNames('UploadImage-placeholder default flex items-center justify-center', shape)}>
                  <Icon name={EIconName.Plus} color={EIconColor.BLACK} />
                </div>
              )}
            </>
          )}
        </div>
      </Upload>

      <ModalCropImage
        {...cropImageModalState}
        aspect={aspect}
        onClose={handleCloseCropImageModal}
        onSuccess={handleCropSuccess}
      />
    </div>
  );
};

export default UploadImage;
