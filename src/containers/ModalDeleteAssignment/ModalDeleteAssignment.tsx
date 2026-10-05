import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ModalConfirm from '@/components/ModalConfirm';
import { EButtonStyleType } from '@/components/Button';
import { ETypeNotification } from '@/common/enums';
import { EDeleteAssignmentsAction, deleteAssignmentsAction } from '@/redux/actions';
import { TRootState } from '@/redux/reducers';
import { showNotification } from '@/utils/functions';

import { TModalDeleteAssignmentProps } from './ModalDeleteAssignment.types';

const ModalDeleteAssignment: React.FC<TModalDeleteAssignmentProps> = ({ visible, data, onClose, onSuccess }) => {
  const dispatch = useDispatch();

  const loading = useSelector(
    (state: TRootState) => state.loadingReducer[EDeleteAssignmentsAction.DELETE_ASSIGNMENTS],
  );

  const handleSubmit = (): void => {
    dispatch(deleteAssignmentsAction.request({ params: { ids: data?.id } }, handleSubmitSuccess));
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, 'Xoá bài tập thành công.');
    onClose?.();
    onSuccess?.();
  };

  return (
    <ModalConfirm
      title="Xoá bài tập"
      visible={visible}
      onClose={onClose}
      onSubmit={handleSubmit}
      loading={loading}
      confirmButton={{ styleType: EButtonStyleType.DANGER }}
      description={
        <>
          Bạn có chắc chắn muốn xoá bài tập <strong>“{data?.name}”</strong> không?
          <br />
          <br />
          Bài tập đã gắn vào bài giảng video sẽ được giữ lại (bản sao).
        </>
      }
    />
  );
};

export default ModalDeleteAssignment;
