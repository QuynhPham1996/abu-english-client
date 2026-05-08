import React from 'react';

import Student from '@/layouts/Student';
import SEO from '@/components/SEO';
import Tabs from '@/components/Tabs';
import UsersStudents from '@/containers/UsersStudents';
import UsersManagers from '@/containers/UsersManagers';
import { ServerProtectedRoute } from '@/utils/server-side';
import { GetServerSideProps } from 'next';

const UsersManagement = () => {
  const dataUsersManagementTabs = [
    {
      key: 'students',
      title: 'Học viên',
      children: (
        <div className="Users-card">
          <UsersStudents />
        </div>
      ),
    },
    {
      key: 'managers',
      title: 'Quản trị viên',
      children: (
        <div className="Users-card">
          <UsersManagers />
        </div>
      ),
    },
  ];

  return (
    <div className="UsersManagement">
      <div className="UsersManagement-wrapper">
        <div className="UsersManagement-table">
          <Tabs options={dataUsersManagementTabs} />
        </div>
      </div>
    </div>
  );
};

export default UsersManagement;

UsersManagement.getLayout = function (page: React.ReactNode) {
  return (
    <>
      <SEO />
      <Student>{page}</Student>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => ServerProtectedRoute(context);
