import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ModalConfirm from '@/components/ModalConfirm';
import { EButtonStyleType } from '@/components/Button';
import { ETypeNotification } from '@/common/enums';
import { EDeleteQuestionsAction, deleteQuestionsAction } from '@/redux/actions';
import { TRootState } from '@/redux/reducers';
import { showNotification } from '@/utils/functions';

import { TModalDeleteQuestionProps } from './ModalDeleteQuestion.types';

const ModalDeleteQuestion: React.FC<TModalDeleteQuestionProps> = ({ visible, data, onClose, onSuccess }) => {
  const dispatch = useDispatch();

  const deleteQuestionsLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EDeleteQuestionsAction.DELETE_QUESTIONS],
  );

  const handleSubmit = (): void => {
    dispatch(deleteQuestionsAction.request({ params: { ids: data?.id } }, handleSubmitSuccess));
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, 'Xoá câu hỏi thành công.');
    onClose?.();
    onSuccess?.();
  };

  return (
    <ModalConfirm
      title="Xoá câu hỏi"
      visible={visible}
      onClose={onClose}
      onSubmit={handleSubmit}
      loading={deleteQuestionsLoading}
      confirmButton={{ styleType: EButtonStyleType.DANGER }}
      description={
        <>
          Bạn có chắc chắn muốn xoá câu hỏi này không?
          <br />
          <br />
          Dữ liệu đã xoá sẽ <strong>không thể khôi phục.</strong>
        </>
      }
    />
  );
};

export default ModalDeleteQuestion;
