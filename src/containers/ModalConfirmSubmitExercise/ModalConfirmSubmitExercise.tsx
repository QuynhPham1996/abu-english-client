import React from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import ModalConfirm from '@/components/ModalConfirm';
import { TDoExerciseData } from '@/containers/DoExerciseMain';
import { ECreateTestAction, createTestAction } from '@/redux/actions';
import { showNotification } from '@/utils/functions';
import { ETypeNotification } from '@/common/enums';
import { Paths } from '@/routers/constants';
import { TRootState } from '@/redux/reducers';

import { TModalConfirmSubmitExerciseProps } from './ModalConfirmSubmitExercise.types';

const ModalConfirmSubmitExercise: React.FC<TModalConfirmSubmitExerciseProps> = ({ visible, data, onClose }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const myCourseLessonState = useSelector((state: TRootState) => state.courseReducer.getMyCourseLessonResponse);

  const createTestLoading = useSelector((state: TRootState) => state.loadingReducer[ECreateTestAction.CREATE_TEST]);

  const handleSubmit = (): void => {
    const body = {
      userLesson: data?.userLessonId,
      userExercise: data?.userExerciseId,
      lesson: data?.lessonId,
      duration: data?.timer,
      userAnswers: data?.doExerciseState?.map((item: TDoExerciseData) => {
        return {
          question: item.id,
          answer: item?.data,
        };
      }),
    };

    dispatch(createTestAction.request({ body }, handleSubmitSuccess));
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, 'Nộp bài tập thành công.');
    onClose?.();

    if (!myCourseLessonState?.data?.isPass && myCourseLessonState?.nextLesson) {
      router.push(Paths.DoExercise(myCourseLessonState?.nextLesson?.id));
    } else {
      router.push(Paths.Exercises);
    }
  };

  return (
    <ModalConfirm
      title="Nộp bài"
      visible={visible}
      onClose={onClose}
      onSubmit={handleSubmit}
      loading={createTestLoading}
      description={
        <div className="text-center">
          Bạn có chắc chắn muốn nộp bài không?
          <br />
          Hãy chắc chắn các câu hỏi đều <strong>đã được trả lời.</strong>
        </div>
      }
    />
  );
};

export default ModalConfirmSubmitExercise;
