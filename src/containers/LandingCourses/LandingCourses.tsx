import React from 'react';
import { Col, Row } from 'antd';
import Image from 'next/image';

import BgLandingCourses from '@/assets/images/bg-landing-courses.png';
import CourseCard from '@/components/CourseCard';
import ImageCourseEmpty from '@/assets/images/image-course-empty.svg';
import EmptyScreen from '@/components/EmptyScreen';

import { TLandingCoursesProps } from './LandingCourses.types.d';
import Carousels from '@/components/Carousels';

const LandingCourses: React.FC<TLandingCoursesProps> = ({ data }) => {
  const isEmpty = data?.data?.length === 0;

  const handleClickLink = (idTarget: string): void => {
    const target = document.querySelector(`${idTarget}`) as any;
    if (target) {
      window.scrollTo({ top: target.offsetTop - 40, behavior: 'smooth' });
    }
  };

  return (
    <section className="LandingCourses" id="courses">
      <div className="container">
        <div className="LandingCourses-wrapper">
          <div className="LandingCourses-background">
            <Image src={BgLandingCourses} alt="" />
          </div>
          <h2 className="LandingCourses-title">Lựa chọn các khóa học phù hợp với bạn</h2>

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
            <div className="LandingCourses-main">
              <Carousels
                className="LandingCourses-carousel"
                infinite={false}
                arrows={false}
                dots
                autoplay={false}
                slidesToShow={3}
                responsive={[
                  {
                    breakpoint: 991,
                    settings: {
                      slidesToShow: 2,
                    },
                  },
                  {
                    breakpoint: 575,
                    settings: {
                      slidesToShow: 1,
                    },
                  },
                ]}
              >
                {data?.data?.map((item) => (
                  <div key={item.id} className="LandingCourses-carousel-item">
                    <CourseCard
                      {...item}
                      totalDurations={data?.totalDurations?.[item.id]}
                      totalExercises={data?.totalExercises?.[item.id]}
                      totalUsers={data?.totalUsers?.[item.id]}
                      onRegister={(): void => handleClickLink('#contact')}
                    />
                  </div>
                ))}
              </Carousels>
              {/* <Row gutter={[24, 24]} justify="center">
                {data?.data?.map((item) => (
                  <Col key={item?.id} span={24} sm={{ span: 12 }} lg={{ span: 8 }}>
                    <div className="flex justify-center">
                      <CourseCard
                        {...item}
                        totalDurations={data?.totalDurations?.[item.id]}
                        totalExercises={data?.totalExercises?.[item.id]}
                        totalUsers={data?.totalUsers?.[item.id]}
                        onRegister={(): void => handleClickLink('#contact')}
                      />
                    </div>
                  </Col>
                ))}
              </Row> */}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default LandingCourses;
