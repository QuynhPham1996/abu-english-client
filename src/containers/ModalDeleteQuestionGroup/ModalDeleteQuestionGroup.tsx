import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import ModalConfirm from '@/components/ModalConfirm';
import { EButtonStyleType } from '@/components/Button';
import { ETypeNotification } from '@/common/enums';
import { EDeleteQuestionGroupsAction, deleteQuestionGroupsAction } from '@/redux/actions';
import { TRootState } from '@/redux/reducers';
import { showNotification } from '@/utils/functions';

import { TModalDeleteQuestionGroupProps } from './ModalDeleteQuestionGroup.types';

const ModalDeleteQuestionGroup: React.FC<TModalDeleteQuestionGroupProps> = ({ visible, data, onClose, onSuccess }) => {
  const dispatch = useDispatch();

  const loading = useSelector(
    (state: TRootState) => state.loadingReducer[EDeleteQuestionGroupsAction.DELETE_QUESTION_GROUPS],
  );

  const handleSubmit = (): void => {
    dispatch(deleteQuestionGroupsAction.request({ params: { ids: data?.id } }, handleSubmitSuccess));
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, 'Xoá nhóm câu hỏi thành công.');
    onClose?.();
    onSuccess?.();
  };

  return (
    <ModalConfirm
      title="Xoá nhóm câu hỏi"
      visible={visible}
      onClose={onClose}
      onSubmit={handleSubmit}
      loading={loading}
      confirmButton={{ styleType: EButtonStyleType.DANGER }}
      description={
        <>
          Bạn có chắc chắn muốn xoá nhóm <strong>“{data?.name}”</strong> không?
          <br />
          <br />
          Các câu hỏi trong ngân hàng thuộc nhóm này sẽ bị xoá. Bản sao đã gắn vào bài tập không bị ảnh hưởng.
        </>
      }
    />
  );
};

export default ModalDeleteQuestionGroup;
