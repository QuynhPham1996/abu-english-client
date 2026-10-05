import React, { useCallback, useEffect, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useDispatch, useSelector } from 'react-redux';

import Student from '@/layouts/Student';
import SEO from '@/components/SEO';
import { parseLoadingAction } from '@/utils/functions';
import DoExerciseIntroduction from '@/containers/DoExerciseIntroduction';
import { ServerProtectedRoute } from '@/utils/server-side';
import LessonPreview from '@/containers/LessonPreview';
import ModalConfirmSubmitExercise from '@/containers/ModalConfirmSubmitExercise';
import { TRootState } from '@/redux/reducers';
import { EGetMyCourseLessonAction, getMyCourseLessonAction } from '@/redux/actions';
import Loading from '@/components/Loading';
import { useRouter } from 'next/router';
import Empty from '@/components/Empty';
import { useModalState, useWarnIfUnsavedChanges } from '@/utils/hooks';

const DoExercise = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const id = router?.query?.id as string;
  const [isStarted, setIsStarted] = useState<boolean>(false);

  const myCourseLessonResponse = useSelector((state: TRootState) => state.courseReducer.getMyCourseLessonResponse);
  const myCourseLessonState = myCourseLessonResponse?.data;
  const getMyCourseLessonLoading = parseLoadingAction(
    useSelector((state: TRootState) => state.loadingReducer[EGetMyCourseLessonAction.GET_MY_COURSE_LESSON]),
  );
  const isEmpty = myCourseLessonState?.lesson?.questions?.length === 0;
  const [confirmSubmitModalState, handleOpenConfirmSubmit, handleCloseConfirmSubmit] = useModalState();

  const getMyCourseLesson = useCallback(() => {
    if (id) dispatch(getMyCourseLessonAction.request({ paths: { id } }));
  }, [dispatch, id]);

  useEffect(() => {
    getMyCourseLesson();
  }, [getMyCourseLesson]);

  useWarnIfUnsavedChanges(isStarted && !confirmSubmitModalState?.visible, () => {
    return confirm(
      'Bạn có chắc chắn muốn thoát bài tập kiểm tra lần này không? Quá trình làm bài sẽ không được lưu lại.',
    );
  });

  return (
    <>
      {getMyCourseLessonLoading ? (
        <div className="DoExercise flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <>
          {!isStarted ? (
            <div className="DoExercise flex items-center justify-center">
              <DoExerciseIntroduction onStart={(): void => setIsStarted(true)} />
            </div>
          ) : (
            <>
              {isEmpty ? (
                <div className="DoExercise flex items-center justify-center">
                  <Empty />
                </div>
              ) : (
                <div className="DoExercise is-doing">
                  <LessonPreview
                    preview={false}
                    lessons={myCourseLessonState?.lesson ? [myCourseLessonState.lesson] : []}
                    lessonId={myCourseLessonState?.lesson?.id}
                    onSubmit={(questions, duration): void =>
                      handleOpenConfirmSubmit({
                        userLessonId: myCourseLessonState?.id,
                        userExerciseId: myCourseLessonResponse?.userExercise?.id,
                        lessonId: myCourseLessonState?.lesson?.id,
                        timer: duration,
                        doExerciseState: questions,
                      })
                    }
                  />
                  <ModalConfirmSubmitExercise {...confirmSubmitModalState} onClose={handleCloseConfirmSubmit} />
                </div>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default DoExercise;

DoExercise.getLayout = function (page: React.ReactNode) {
  return (
    <>
      <SEO />
      <Student>{page}</Student>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => ServerProtectedRoute(context);
