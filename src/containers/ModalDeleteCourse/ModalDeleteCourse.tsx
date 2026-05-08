import React from 'react';

import ModalConfirm from '@/components/ModalConfirm';
import { EButtonStyleType } from '@/components/Button';

import { TModalDeleteCourseProps } from './ModalDeleteCourse.types';
import HelpBadge, { EHelpBadgeType } from '@/components/HelpBadge';
import { useDispatch, useSelector } from 'react-redux';
import { TRootState } from '@/redux/reducers';
import { EDeleteCoursesAction, deleteCoursesAction } from '@/redux/actions';
import { EEmpty, ETypeNotification } from '@/common/enums';
import { showNotification } from '@/utils/functions';

const ModalDeleteCourse: React.FC<TModalDeleteCourseProps> = ({ visible, data, onClose, onSuccess }) => {
  const dispatch = useDispatch();

  const coursesState = useSelector((state: TRootState) => state.courseReducer.getCoursesResponse);

  const totalUsers = Number(coursesState?.totalUsers?.[data?.id as any] || EEmpty.ZERO);

  const deleteCoursesLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EDeleteCoursesAction.DELETE_COURSES],
  );

  const handleSubmit = (): void => {
    dispatch(deleteCoursesAction.request({ params: { ids: data?.id } }, handleSubmitSuccess));
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, 'Xoá khoá học thành công.');
    onClose?.();
    onSuccess?.();
  };

  return (
    <ModalConfirm
      title="Xoá khoá học"
      visible={visible}
      onClose={onClose}
      onSubmit={handleSubmit}
      loading={deleteCoursesLoading}
      confirmButton={{ styleType: EButtonStyleType.DANGER }}
      description={
        <>
          {totalUsers > 0 && (
            <>
              <HelpBadge
                title={<>Hiện tại đang có {totalUsers} học viên sở hữu khoá học này.</>}
                type={EHelpBadgeType.DANGER}
              />
              <br />
            </>
          )}
          Bạn có chắc chắn muốn xoá khoá học <strong>“{data?.name}”</strong> không?
          <br />
          <br />
          Dữ liệu đã xoá sẽ <strong>không thể khôi phục.</strong> Toàn bộ tiến độ học tập của học viên{' '}
          <strong>sẽ bị mất.</strong>
        </>
      }
    />
  );
};

export default ModalDeleteCourse;
