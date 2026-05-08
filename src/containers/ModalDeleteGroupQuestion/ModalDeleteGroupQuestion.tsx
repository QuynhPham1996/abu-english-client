import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ModalConfirm from '@/components/ModalConfirm';
import { EButtonStyleType } from '@/components/Button';
import { EDeleteLessonsAction, deleteLessonsAction } from '@/redux/actions';
import { ETypeNotification } from '@/common/enums';
import { TRootState } from '@/redux/reducers';
import { showNotification } from '@/utils/functions';

import { TModalDeleteGroupQuestionProps } from './ModalDeleteGroupQuestion.types';

const ModalDeleteGroupQuestion: React.FC<TModalDeleteGroupQuestionProps> = ({ visible, data, onClose, onSuccess }) => {
  const dispatch = useDispatch();

  const deleteLessonsLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EDeleteLessonsAction.DELETE_LESSONS],
  );

  const handleSubmit = (): void => {
    dispatch(deleteLessonsAction.request({ params: { ids: data?.id } }, handleSubmitSuccess));
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
      loading={deleteLessonsLoading}
      confirmButton={{ styleType: EButtonStyleType.DANGER }}
      description={
        <>
          Bạn có chắc chắn muốn xoá bài tập <strong>“{data?.name}”</strong> không?
          <br />
          <br />
          Dữ liệu đã xoá sẽ <strong>không thể khôi phục.</strong> Toàn bộ câu hỏi trong bài tập này{' '}
          <strong>sẽ bị mất.</strong>
        </>
      }
    />
  );
};

export default ModalDeleteGroupQuestion;
