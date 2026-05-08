import React from 'react';
import { GetServerSideProps } from 'next';
import axios from 'axios';

import env from '@/env';
import SEO from '@/components/SEO';
import Guest from '@/layouts/Guest';
import LandingBanner from '@/containers/LandingBanner';
import LandingWhyChooseUs from '@/containers/LandingWhyChooseUs';
import LandingTestRegister from '@/containers/LandingTestRegister';
import LandingCourses from '@/containers/LandingCourses';
import LandingReviews from '@/containers/LandingReviews';
import LandingContact from '@/containers/LandingContact';
import { TGetPublicCoursesResponse } from '@/services/api';

const Home = ({ courses }: { courses: TGetPublicCoursesResponse }) => {
  return (
    <>
      <LandingBanner />
      <LandingWhyChooseUs />
      <LandingCourses data={courses} />
      {/* <LandingTestRegister /> */}
      <LandingReviews />
      <LandingContact />
    </>
  );
};

export default Home;

Home.getLayout = function (page: React.ReactNode) {
  return (
    <>
      <SEO />
      <Guest>{page}</Guest>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const getPublicCourses = await axios.get(`${env.api.baseUrl.service}/public/courses`);
  const courses = getPublicCourses.data;

  return {
    props: {
      courses,
    },
  };
};
