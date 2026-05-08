import React, { useCallback, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { useDispatch, useSelector } from 'react-redux';

import Student from '@/layouts/Student';
import SEO from '@/components/SEO';
import { ServerProtectedRoute } from '@/utils/server-side';
import { TRootState } from '@/redux/reducers';
import { EUserRole } from '@/common/enums';
import { useRouter } from 'next/router';
import { Paths } from '@/routers/constants';
import { getMyProfileAction } from '@/redux/actions';

const RoleNavigate = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const myProfileState = useSelector((state: TRootState) => state.userReducer.getMyProfileResponse)?.data;
  const isManager = [EUserRole.MANAGER, EUserRole.SUPER_ADMIN].includes(myProfileState?.role as EUserRole);

  const getMyProfile = useCallback(() => {
    dispatch(getMyProfileAction.request({}));
  }, [dispatch]);

  useEffect(() => {
    getMyProfile();
  }, [getMyProfile]);

  useEffect(() => {
    if (myProfileState) {
      if (isManager) {
        router.push(Paths.UsersManagement);
      } else {
        router.push(Paths.Learn);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myProfileState]);

  return <SEO />;
};

export default RoleNavigate;

export const getServerSideProps: GetServerSideProps = async (context) => ServerProtectedRoute(context);
