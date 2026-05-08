import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ModalConfirm from '@/components/ModalConfirm';
import { TRootState } from '@/redux/reducers';
import { ERegisterCourseAction, registerCourseAction } from '@/redux/actions';

import { TModalRegisterCourseProps } from './ModalRegisterCourse.types';
import { showNotification } from '@/utils/functions';
import { ETypeNotification } from '@/common/enums';

const ModalRegisterCourse: React.FC<TModalRegisterCourseProps> = ({ visible, data, onClose }) => {
  const dispatch = useDispatch();

  const registerCourseLoading = useSelector(
    (state: TRootState) => state.loadingReducer[ERegisterCourseAction.REGISTER_COURSE],
  );

  const handleSubmit = (): void => {
    dispatch(registerCourseAction.request({ paths: { id: data?.id || '' } }, handleSubmitSuccess));
  };

  const handleSubmitSuccess = (): void => {
    showNotification(
      ETypeNotification.SUCCESS,
      'Bạn đã gửi yêu cầu đăng ký thành công. Vui lòng chờ quản trị viên phê duyệt.',
    );
    onClose?.();
  };

  return (
    <ModalConfirm
      title="Đăng ký khoá học"
      visible={visible}
      onClose={onClose}
      onSubmit={handleSubmit}
      loading={registerCourseLoading}
      description={
        <>
          Bạn có chắc chắn muốn đăng ký khoá học <strong>“{data?.name}”</strong> không?
          <br />
          <br />
          Hệ thống sẽ tự động gửi yêu cầu và thông báo đến quản trị viên.
          <br />
          <br />
          Vui lòng truy cập trang{' '}
          <strong>
            <a href="https://www.facebook.com/profile.php?id=61552926075305" target="_blank">
              Abu English Club
            </a>
          </strong>{' '}
          để liên hệ và được tư vấn.
        </>
      }
    />
  );
};

export default ModalRegisterCourse;
