import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ModalConfirm from '@/components/ModalConfirm';
import { EButtonStyleType } from '@/components/Button';
import { ETypeNotification } from '@/common/enums';
import { EDeleteExercisesAction, deleteExercisesAction } from '@/redux/actions';
import { TRootState } from '@/redux/reducers';
import { showNotification } from '@/utils/functions';

import { TModalDeleteExerciseProps } from './ModalDeleteExercise.types';

const ModalDeleteExercise: React.FC<TModalDeleteExerciseProps> = ({ visible, data, onSuccess, onClose }) => {
  const dispatch = useDispatch();

  const deleteExercisesLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EDeleteExercisesAction.DELETE_EXERCISES],
  );

  const handleSubmit = (): void => {
    dispatch(deleteExercisesAction.request({ params: { ids: data?.id } }, handleSubmitSuccess));
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, 'Xoá bài học thành công.');
    onClose?.();
    onSuccess?.();
  };

  return (
    <ModalConfirm
      title="Xoá bài học"
      visible={visible}
      onClose={onClose}
      onSubmit={handleSubmit}
      loading={deleteExercisesLoading}
      confirmButton={{ styleType: EButtonStyleType.DANGER }}
      description={
        <>
          Bạn có chắc chắn muốn xoá bài học <strong>“{data?.name}”</strong> không?
          <br />
          <br />
          Dữ liệu đã xoá sẽ <strong>không thể khôi phục.</strong> Bài học khi xoá sẽ <strong>ảnh hưởng</strong> đến{' '}
          <strong>tiến độ của học viên.</strong>
        </>
      }
    />
  );
};

export default ModalDeleteExercise;
