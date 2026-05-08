import React, { useCallback, useState } from 'react';
import Cropper, { Area } from 'react-easy-crop';

import Modal from '@/components/Modal';

import { TModalCropImageProps } from './ModalCropImage.types';
import getCroppedImage from './ModalCropImage.data';

const ModalCropImage: React.FC<TModalCropImageProps> = ({ visible, data, aspect = 4 / 3, onClose, onSuccess }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSubmit = async (): Promise<void> => {
    try {
      if (croppedAreaPixels) {
        const croppedImage = await getCroppedImage(data?.file, croppedAreaPixels);
        onClose?.();
        onSuccess?.(croppedImage);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Modal title="Cắt Ảnh" visible={visible} onClose={onClose} onSubmit={handleSubmit} showActions zIndex={1031}>
      <div className="ModalCropImage-wrapper" style={{ position: 'relative', minHeight: '60vh' }}>
        {data?.file && (
          <Cropper
            image={data?.file}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        )}
      </div>
    </Modal>
  );
};

export default ModalCropImage;
