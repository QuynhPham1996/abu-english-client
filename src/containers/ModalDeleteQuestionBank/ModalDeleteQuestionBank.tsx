import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ModalConfirm from '@/components/ModalConfirm';
import { EButtonStyleType } from '@/components/Button';
import { ETypeNotification } from '@/common/enums';
import { EDeleteQuestionBankAction, deleteQuestionBankAction } from '@/redux/actions';
import { TRootState } from '@/redux/reducers';
import { showNotification } from '@/utils/functions';

import { TModalDeleteQuestionBankProps } from './ModalDeleteQuestionBank.types';

const ModalDeleteQuestionBank: React.FC<TModalDeleteQuestionBankProps> = ({ visible, data, onClose, onSuccess }) => {
  const dispatch = useDispatch();

  const loading = useSelector(
    (state: TRootState) => state.loadingReducer[EDeleteQuestionBankAction.DELETE_QUESTION_BANK],
  );

  const handleSubmit = (): void => {
    dispatch(deleteQuestionBankAction.request({ params: { ids: data?.id } }, handleSubmitSuccess));
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, 'Xoá câu hỏi khỏi ngân hàng thành công.');
    onClose?.();
    onSuccess?.();
  };

  return (
    <ModalConfirm
      title="Xoá câu hỏi"
      visible={visible}
      onClose={onClose}
      onSubmit={handleSubmit}
      loading={loading}
      confirmButton={{ styleType: EButtonStyleType.DANGER }}
      description={
        <>
          Bạn có chắc chắn muốn xoá câu hỏi này khỏi ngân hàng không?
          <br />
          <br />
          Bản sao đã gắn vào bài tập không bị ảnh hưởng.
        </>
      }
    />
  );
};

export default ModalDeleteQuestionBank;
