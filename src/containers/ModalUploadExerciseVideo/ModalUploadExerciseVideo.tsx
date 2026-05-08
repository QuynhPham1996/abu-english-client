import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Progress, Upload } from 'antd';
import Image from 'next/image';
import { DraggerProps, UploadChangeParam } from 'antd/lib/upload';

import Modal from '@/components/Modal';
import IconVideoUpload from '@/assets/icons/icon-video-upload.png';
import Button, { EButtonStyleType } from '@/components/Button';
import ApiService from '@/services/api';
import env from '@/env';

import { TModalUploadExerciseVideoProps } from './ModalUploadExerciseVideo.types';
import { showNotification } from '@/utils/functions';
import { EResponseCode, ETypeNotification } from '@/common/enums';
import { EIconColor } from '@/components/Icon';

const { Dragger } = Upload;

const DraggerModify: React.FC<DraggerProps & { children?: React.ReactNode }> = Dragger;

const ModalUploadExerciseVideo: React.FC<TModalUploadExerciseVideoProps> = ({ visible, data, onClose, onSuccess }) => {
  const [processPercent, setProcessPercent] = useState<number>(0);
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);

  const handleUploadVideo = async (dataChanged: UploadChangeParam): Promise<void> => {
    const file = dataChanged?.file?.originFileObj;
    if (file) {
      setUploadLoading(true);

      const formData = new FormData();
      formData.append('file', file);

      const res = await ApiService.post(`${env.api.baseUrl.service}/exercises/${data?.id}`, formData, {
        onUploadProgress: (e): void => {
          const percent = (e.loaded / e.total) * 100;
          setProcessPercent(percent);

          if (percent === 100) {
          }
        },
      });

      if ([EResponseCode.OK, EResponseCode.CREATED].includes(res?.status)) {
        handleUploadSuccess();
      }
    }
  };

  const handleUploadSuccess = (): void => {
    setUploadLoading(false);
    showNotification(ETypeNotification.SUCCESS, 'Upload video bài học thành công.');
    onClose?.();
    onSuccess?.();
  };

  useEffect(() => {
    if (visible) {
      setProcessPercent(0);
      setUploadLoading(false);
    }
  }, [visible]);

  return (
    <Modal
      className="ModalUploadExerciseVideo"
      title={`Upload video cho bài học “${data?.name}”`}
      visible={visible}
      onClose={uploadLoading ? undefined : onClose}
      width={520}
    >
      <div className="ModalUploadExerciseVideo-wrapper">
        <DraggerModify fileList={[]} accept=".mp4,.mov" onChange={handleUploadVideo} disabled={uploadLoading}>
          <div className="ModalUploadExerciseVideo-upload-wrapper flex flex-col items-center justify-center">
            <div className="ModalUploadExerciseVideo-icon">
              <Image src={IconVideoUpload} alt="" fill />
            </div>
            {uploadLoading ? (
              <>
                <div className="ModalUploadExerciseVideo-process">
                  <Progress
                    percent={processPercent}
                    status="active"
                    strokeColor={EIconColor.MOUNTAIN_MEADOW}
                    showInfo={false}
                  />
                </div>
                <div className="ModalUploadExerciseVideo-text small" style={{ marginTop: '1.2rem' }}>
                  Vui lòng không tắt trình duyệt cho đến khi quá trình này hoàn tất !
                </div>
              </>
            ) : (
              <>
                <div className="ModalUploadExerciseVideo-text">Bạn có thể kéo và thả file video tại đây</div>
                <div className="ModalUploadExerciseVideo-text small">hoặc</div>
                <div className="ModalUploadExerciseVideo-btn">
                  <Button title="Chọn File" styleType={EButtonStyleType.PRIMARY} />
                </div>
              </>
            )}
          </div>
        </DraggerModify>

        <div
          className="ModalUploadExerciseVideo-text small"
          style={{ marginTop: '1.2rem' }}
        >{`Vui lòng chọn file có định dạng .mov hoặc .mp4 và dung lượng < 50GB`}</div>
      </div>
    </Modal>
  );
};

export default ModalUploadExerciseVideo;
