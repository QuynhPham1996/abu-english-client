import React from 'react';

import Modal from '@/components/Modal';
import Button, { EButtonStyleType } from '@/components/Button';

import { TModalConfirmProps } from './ModalConfirm.types';

const ModalConfirm: React.FC<TModalConfirmProps> = ({
  visible,
  title,
  description,
  loading,
  cancelButton,
  confirmButton,
  hideCancelButton,
  onClose,
  onSubmit,
}) => {
  return (
    <Modal width={460} className="ModalConfirm" visible={visible} onClose={onClose} loading={loading} closeable={false}>
      <div className="ModalConfirm-wrapper">
        <div className="ModalConfirm-info">
          <div className="ModalConfirm-info-title text-center">{title}</div>
          <div className="ModalConfirm-info-description">{description}</div>
        </div>
        <div className="ModalConfirm-actions flex justify-center">
          <Button
            title="Đồng ý"
            styleType={EButtonStyleType.PRIMARY}
            disabled={loading}
            {...confirmButton}
            onClick={onSubmit}
          />
          {!hideCancelButton && (
            <Button
              title="Huỷ bỏ"
              styleType={EButtonStyleType.OUTLINE_GEYSER}
              disabled={loading}
              {...cancelButton}
              onClick={onClose}
            />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ModalConfirm;
