import React, { useCallback, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import SEO from '@/components/SEO';
import Student from '@/layouts/Student';
import { ServerProtectedRoute } from '@/utils/server-side';
import ViewExerciseMain from '@/containers/ViewExerciseMain';
import { useDispatch, useSelector } from 'react-redux';
import { EGetTestUserAction, getTestUserAction } from '@/redux/actions';
import { TRootState } from '@/redux/reducers';
import Loading from '@/components/Loading';

const ExerciseDetail = () => {
  const router = useRouter();
  const id = router?.query?.id as string;
  const dispatch = useDispatch();

  const getTestLoading = useSelector((state: TRootState) => state.loadingReducer[EGetTestUserAction.GET_TEST_USER]);

  const getTest = useCallback(() => {
    if (id) dispatch(getTestUserAction.request({ paths: { id } }));
  }, [id, dispatch]);

  useEffect(() => {
    getTest();
  }, [getTest]);

  return getTestLoading ? (
    <div className="ExerciseDetail flex items-center justify-center">
      <Loading />
    </div>
  ) : (
    <div className="ExerciseDetail">
      <ViewExerciseMain />
    </div>
  );
};

export default ExerciseDetail;

ExerciseDetail.getLayout = function (page: React.ReactNode) {
  return (
    <>
      <SEO />
      <Student>{page}</Student>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => ServerProtectedRoute(context);
