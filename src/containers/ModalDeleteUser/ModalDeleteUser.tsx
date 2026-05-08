import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ModalConfirm from '@/components/ModalConfirm';
import { EButtonStyleType } from '@/components/Button';
import { TRootState } from '@/redux/reducers';
import { EDeleteUsersAction, deleteUsersAction } from '@/redux/actions';
import { showNotification } from '@/utils/functions';
import { ETypeNotification } from '@/common/enums';

import { TModalDeleteUserProps } from './ModalDeleteUser.types';

const ModalDeleteUser: React.FC<TModalDeleteUserProps> = ({ visible, data, onClose, onSuccess }) => {
  const dispatch = useDispatch();

  const deleteUsersLoading = useSelector((state: TRootState) => state.loadingReducer[EDeleteUsersAction.DELETE_USERS]);

  const handleSubmit = (): void => {
    dispatch(deleteUsersAction.request({ params: { ids: data?.id } }, handleSubmitSuccess));
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, 'Xoá người dùng thành công.');
    onClose?.();
    onSuccess?.();
  };

  return (
    <ModalConfirm
      title="Xoá người dùng"
      visible={visible}
      onClose={onClose}
      onSubmit={handleSubmit}
      loading={deleteUsersLoading}
      confirmButton={{ styleType: EButtonStyleType.DANGER }}
      description={
        <>
          Bạn có chắc chắn muốn xoá người dùng <strong>“{data?.name}”</strong> không?
          <br />
          <br />
          Dữ liệu đã xoá sẽ <strong>không thể khôi phục.</strong> Toàn bộ tiến độ học tập của học viên{' '}
          <strong>sẽ bị mất.</strong>
        </>
      }
    />
  );
};

export default ModalDeleteUser;
