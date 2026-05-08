import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import ModalConfirm from '@/components/ModalConfirm';
import Helpers from '@/services/helpers';
import { Paths } from '@/routers/constants';
import { TRootState } from '@/redux/reducers';
import { ELogoutAction, getMyProfileAction, logoutAction } from '@/redux/actions';

import { TModalLogoutProps } from './ModalLogout.types.d';

const ModalLogout: React.FC<TModalLogoutProps> = ({ visible, onClose }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const logoutLoading = useSelector((state: TRootState) => state.loadingReducer[ELogoutAction.LOGOUT]);

  const handleSubmit = (): void => {
    dispatch(
      logoutAction.request({}, (): void => {
        router.push(Paths.Login);
        dispatch(getMyProfileAction.success(undefined));
        Helpers.clearTokens();
      }),
    );
  };

  return (
    <ModalConfirm
      title="Đăng xuất"
      visible={visible}
      onClose={onClose}
      onSubmit={handleSubmit}
      loading={logoutLoading}
      description={
        <div className="text-center">Bạn có chắc chắn muốn đăng xuất khỏi phiên đăng nhập lần này không ?</div>
      }
    />
  );
};

export default ModalLogout;
