import React, { useCallback, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import SEO from '@/components/SEO';
import LessonPreview from '@/containers/LessonPreview';
import { EGetLessonsFromExerciseAction, getLessonsFromExerciseAction } from '@/redux/actions';
import { TRootState } from '@/redux/reducers';
import { parseLoadingAction } from '@/utils/functions';
import { ServerProtectedRoute } from '@/utils/server-side';

const LessonPreviewPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const exerciseId = router.query.exerciseId as string;
  const lessonId = router.query.lesson as string;
  const lessons = useSelector((state: TRootState) => state.lessonReducer.getLessonsFromExerciseResponse)?.data;
  const loading = parseLoadingAction(
    useSelector((state: TRootState) => state.loadingReducer[EGetLessonsFromExerciseAction.GET_LESSONS_FROM_EXERCISE]),
  );

  const getLessons = useCallback(() => {
    if (exerciseId) dispatch(getLessonsFromExerciseAction.request({ paths: { exerciseid: exerciseId } }));
  }, [dispatch, exerciseId]);

  useEffect(() => {
    getLessons();
  }, [getLessons]);

  const changeLesson = (nextLessonId: string): void => {
    router.replace(
      {
        pathname: router.pathname,
        query: { ...router.query, lesson: nextLessonId },
      },
      undefined,
      { shallow: true },
    );
  };

  return (
    <>
      <SEO title="Xem trước bài tập" />
      <LessonPreview lessons={lessons} lessonId={lessonId} loading={loading && !lessons} onChangeLesson={changeLesson} />
    </>
  );
};

export default LessonPreviewPage;

export const getServerSideProps: GetServerSideProps = async (context) => ServerProtectedRoute(context);
