import React, { useCallback, useEffect } from 'react';
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import Student from '@/layouts/Student';
import SEO from '@/components/SEO';
import CourseCard from '@/components/CourseCard';
import ModalRegisterCourse from '@/containers/ModalRegisterCourse';
import { useModalState } from '@/utils/hooks';
import { EGetCoursesAvailableAction, getCoursesAvailableAction } from '@/redux/actions';
import { TRootState } from '@/redux/reducers';
import Loading from '@/components/Loading';
import { parseLoadingAction } from '@/utils/functions';
import EmptyScreen from '@/components/EmptyScreen';
import ImageCourseEmpty from '@/assets/images/image-course-empty.svg';
import { ServerProtectedRoute } from '@/utils/server-side';
import { GetServerSideProps } from 'next';

const Courses = () => {
  const dispatch = useDispatch();
  const [registerCourseModalState, handleOpenRegisterCourseModal, handleCloseRegisterCourseModal] = useModalState();

  const coursesAvailableState = useSelector((state: TRootState) => state.courseReducer.getCoursesAvailableResponse);
  const getCoursesAvailableLoading = parseLoadingAction(
    useSelector((state: TRootState) => state.loadingReducer[EGetCoursesAvailableAction.GET_COURSES_AVAILABLE]),
  );
  const isEmpty = coursesAvailableState?.data?.length === 0;

  const getCoursesAvailable = useCallback(() => {
    dispatch(getCoursesAvailableAction.request({}));
  }, [dispatch]);

  useEffect(() => {
    getCoursesAvailable();
  }, [getCoursesAvailable]);

  return (
    <>
      <div className="Courses">
        {getCoursesAvailableLoading ? (
          <div className="Courses-loading flex items-center justify-center">
            <Loading />
          </div>
        ) : (
          <>
            {isEmpty ? (
              <EmptyScreen
                image={ImageCourseEmpty}
                title={
                  <>
                    Hiện tại không có khoá học nào khả dụng.
                    <br />
                    Chúng tôi sẽ cập nhật những khoá học mới trong thời gian sớm nhất tại đây.
                  </>
                }
              />
            ) : (
              <div className="Courses-main flex flex-col justify-center">
                <div className="Courses-title text-center">Các Khoá Học Thịnh Hành</div>
                <div className="Courses-wrapper">
                  <Row gutter={[24, 24]} justify="center">
                    {coursesAvailableState?.data?.map((item) => (
                      <Col key={item.id} span={24} sm={{ span: 12 }} lg={{ span: 6 }}>
                        <CourseCard
                          {...item}
                          totalDurations={coursesAvailableState?.totalDurations?.[item.id]}
                          totalExercises={coursesAvailableState?.totalExercises?.[item.id]}
                          totalUsers={coursesAvailableState?.totalUsers?.[item.id]}
                          onRegister={(): void => handleOpenRegisterCourseModal(item)}
                        />
                      </Col>
                    ))}
                  </Row>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <ModalRegisterCourse {...registerCourseModalState} onClose={handleCloseRegisterCourseModal} />
    </>
  );
};

export default Courses;

Courses.getLayout = function (page: React.ReactNode) {
  return (
    <>
      <SEO />
      <Student>{page}</Student>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => ServerProtectedRoute(context);
