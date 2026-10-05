import React, { useCallback, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import SEO from '@/components/SEO';
import LessonPreview from '@/containers/LessonPreview';
import { TPreviewLesson } from '@/containers/LessonPreview';
import { EGetAssignmentAction, getAssignmentAction } from '@/redux/actions';
import { TRootState } from '@/redux/reducers';
import { parseLoadingAction } from '@/utils/functions';
import { ServerProtectedRoute } from '@/utils/server-side';

const AssignmentPreviewPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const id = router.query.id as string;
  const assignment = useSelector((state: TRootState) => state.assignmentReducer.getAssignmentResponse)?.data;
  const loading = parseLoadingAction(
    useSelector((state: TRootState) => state.loadingReducer[EGetAssignmentAction.GET_ASSIGNMENT]),
  );

  const getAssignment = useCallback(() => {
    if (id) dispatch(getAssignmentAction.request({ paths: { id } }));
  }, [dispatch, id]);

  useEffect(() => {
    getAssignment();
  }, [getAssignment]);

  const lesson: TPreviewLesson | undefined = assignment
    ? {
        id: assignment.id,
        name: assignment.name,
        type: assignment.type,
        arrange: assignment.arrange,
        questions: assignment.questions,
        exercise: { name: 'Bài tập thư viện' },
      }
    : undefined;

  return (
    <>
      <SEO title="Xem trước bài tập" />
      <LessonPreview lessons={lesson ? [lesson] : []} lessonId={lesson?.id} loading={loading && !assignment} />
    </>
  );
};

export default AssignmentPreviewPage;

export const getServerSideProps: GetServerSideProps = async (context) => ServerProtectedRoute(context);
