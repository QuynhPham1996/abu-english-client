import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Header from '@/containers/Header';
import { EUserRole } from '@/common/enums';
import { getMyProfileAction } from '@/redux/actions';
import { TRootState } from '@/redux/reducers';

import { TStudentProps } from './Student.types';

const Student: React.FC<TStudentProps> = ({ children }) => {
  const dispatch = useDispatch();

  const myProfileState = useSelector((state: TRootState) => state.userReducer.getMyProfileResponse)?.data;

  const getMyProfile = useCallback(() => {
    dispatch(getMyProfileAction.request({}));
  }, [dispatch]);

  useEffect(() => {
    getMyProfile();
  }, [getMyProfile]);

  return myProfileState ? (
    <div className="Student">
      <header className="Student-header">
        <Header />
      </header>
      <main className="Student-body">{children}</main>
    </div>
  ) : (
    <></>
  );
};

export default Student;
