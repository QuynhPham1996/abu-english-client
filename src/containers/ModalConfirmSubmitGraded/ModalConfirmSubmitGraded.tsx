import React from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import ModalConfirm from '@/components/ModalConfirm';
import { TDoExerciseData } from '@/containers/DoExerciseMain';
import { EGradedTestAction, gradedTestAction } from '@/redux/actions';
import { showNotification } from '@/utils/functions';
import { ETypeNotification } from '@/common/enums';
import { Paths } from '@/routers/constants';
import { TRootState } from '@/redux/reducers';
import { TUserAnswer } from '@/common/models';

import { TModalConfirmSubmitGradedProps } from './ModalConfirmSubmitGraded.types';

const ModalConfirmSubmitGraded: React.FC<TModalConfirmSubmitGradedProps> = ({ visible, data, onClose }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const gradedTestLoading = useSelector((state: TRootState) => state.loadingReducer[EGradedTestAction.GRADED_TEST]);

  const handleSubmit = (): void => {
    const body = {
      userAnswers: data?.testState?.data?.userAnswers?.map((userAnswer: TUserAnswer) => {
        const stateData = data?.doExerciseState?.find((item: TDoExerciseData) => item.id === userAnswer?.question);

        return {
          ...userAnswer,
          isCorrect: stateData?.isCorrect,
          note: stateData?.note,
        };
      }),
    };

    dispatch(gradedTestAction.request({ paths: { id: data?.testState?.data?.id }, body }, handleSubmitSuccess));
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, 'Chấm bài tập thành công.');
    onClose?.();
    router.push(Paths.ExercisesManagement);
  };

  return (
    <ModalConfirm
      title="Hoàn thành chấm bài"
      visible={visible}
      onClose={onClose}
      onSubmit={handleSubmit}
      loading={gradedTestLoading}
      description={
        <div className="text-center">
          Bạn có chắc chắn muốn hoàn thành chấm bài không?
          <br />
          Hãy chắc chắn các câu hỏi đều <strong>đã được đánh giá.</strong>
        </div>
      }
    />
  );
};

export default ModalConfirmSubmitGraded;
