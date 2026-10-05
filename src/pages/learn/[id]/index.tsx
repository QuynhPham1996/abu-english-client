import React, { useCallback, useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { GetServerSideProps } from 'next';
import { useDispatch, useSelector } from 'react-redux';

import Student from '@/layouts/Student';
import SEO from '@/components/SEO';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import { Paths } from '@/routers/constants';
import VideoCourse from '@/components/VideoCourse';
import { ServerProtectedRoute } from '@/utils/server-side';
import {
  EGetMyCourseExerciseAction,
  EWatchingExerciseVideoAction,
  getMyCourseExerciseAction,
  watchingExerciseVideoAction,
} from '@/redux/actions';
import { TRootState } from '@/redux/reducers';
import Loading from '@/components/Loading';
import { formatVideoDuration, getFullPath, parseLoadingAction } from '@/utils/functions';
import { EEmpty } from '@/common/enums';
import TableContentExercise from '@/containers/TableContentExercise';

const LearnDetail = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const id = router?.query?.id as string;

  const [isPassExercise, setIsPassExercise] = useState<boolean>(false);

  const myCourseExerciseState = useSelector((state: TRootState) => state.courseReducer.getMyCourseExerciseResponse);
  const exerciseState = myCourseExerciseState?.data?.exercise;
  const getMyCourseExerciseLoading = parseLoadingAction(
    useSelector((state: TRootState) => state.loadingReducer[EGetMyCourseExerciseAction.GET_MY_COURSE_EXERCISE]),
  );

  const exerciseIndex = (myCourseExerciseState?.userExercises?.findIndex((item) => item.id === id) || 0) + 1;
  const watchingExerciseVideo = useSelector(
    (state: TRootState) => state.loadingReducer[EWatchingExerciseVideoAction.WATCHING_EXERCISE_VIDEO],
  );

  const exerciseLessons = myCourseExerciseState?.userLessons?.filter(
    (item) => item?.lesson?.exercise?.id === exerciseState?.id,
  );
  const exerciseLessonNames = new Set(exerciseLessons?.map((item) => item?.lesson?.name).filter(Boolean));
  const exerciseAttempts =
    myCourseExerciseState?.tests?.filter(
      (test) =>
        exerciseLessons?.some((item) => item.id === test?.userLesson?.id) ||
        exerciseLessonNames.has(test?.lesson?.name),
    ) || [];

  const totalQuestions = Object.keys(myCourseExerciseState?.totalQuestions || {})?.reduce((result, item) => {
    return result + (myCourseExerciseState?.totalQuestions?.[item] || 0);
  }, 0);

  const handleClickVideo = (): void => {
    if (!isPassExercise && !watchingExerciseVideo) {
      dispatch(
        watchingExerciseVideoAction.request({ paths: { id } }, (): void => {
          setIsPassExercise(true);
        }),
      );
    }
  };

  const getMyCourseExercise = useCallback(() => {
    if (id) dispatch(getMyCourseExerciseAction.request({ paths: { id } }));
  }, [dispatch, id]);

  useEffect(() => {
    if (myCourseExerciseState && myCourseExerciseState?.data?.isPass) {
      setIsPassExercise(true);
    }
  }, [myCourseExerciseState]);

  useEffect(() => {
    getMyCourseExercise();
  }, [getMyCourseExercise]);

  return (
    <>
      <div className="LearnDetail">
        {getMyCourseExerciseLoading ? (
          <div className="LearnDetail-loading flex items-center justify-center">
            <Loading />
          </div>
        ) : (
          <div className="LearnDetail-wrapper">
            <Row gutter={[24, 24]}>
              <Col span={24} lg={{ span: 16 }}>
                <VideoCourse src={getFullPath(exerciseState?.videoUrl)} onClick={handleClickVideo} />
              </Col>
              <Col span={24} lg={{ span: 8 }}>
                <Link href={Paths.Learn} className="LearnDetail-back flex items-center">
                  <Icon name={EIconName.ArrowLeft} color={EIconColor.GERALDINE} />
                  Quay lại
                </Link>
                <h1 className="LearnDetail-title">{exerciseState?.name}</h1>
                <p className="LearnDetail-description pre-line">{exerciseState?.description}</p>

                <div className="LearnDetail-line">
                  <span>
                    <strong>Thông Tin</strong>
                  </span>
                </div>

                <div className="LearnDetail-list">
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <div className="LearnDetail-list-item flex items-center">
                        <Icon name={EIconName.Book} color={EIconColor.SHARK} />
                        <p className="LearnDetail-description">
                          <strong>
                            Bài học: {exerciseIndex}/{myCourseExerciseState?.userExercises?.length || EEmpty.ZERO}
                          </strong>
                        </p>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className="LearnDetail-list-item flex items-center">
                        <Icon name={EIconName.Clock} color={EIconColor.SHARK} />
                        <p className="LearnDetail-description">
                          <strong>Thời lượng: {formatVideoDuration(exerciseState?.videoDuration || 0) || '0s'}</strong>
                        </p>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className="LearnDetail-list-item flex items-center">
                        <Icon name={EIconName.Help} color={EIconColor.SHARK} />
                        <p className="LearnDetail-description">
                          <strong>Số câu hỏi: {totalQuestions}</strong>
                        </p>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className="LearnDetail-list-item flex items-center">
                        <Icon name={EIconName.Book2} color={EIconColor.SHARK} />
                        <p className="LearnDetail-description">
                          <strong>
                            Tổng số lần làm bài tập: {exerciseAttempts.length || EEmpty.ZERO}
                          </strong>
                        </p>
                      </div>
                    </Col>
                  </Row>
                </div>

                <div className="LearnDetail-line">
                  <span>
                    <strong>Mục Lục</strong>
                  </span>
                </div>

                <div className="LearnDetail-exercises">
                  <TableContentExercise
                    activeId={myCourseExerciseState?.data?.id}
                    showBadge={false}
                    showLessons
                    collapsibleLessons
                    gradedLessonIds={myCourseExerciseState?.gradedLessonIds}
                    userLessons={myCourseExerciseState?.userLessons}
                    userExercises={myCourseExerciseState?.userExercises}
                    getLessonDescription={(userLesson): string => {
                      const totalQuestion = myCourseExerciseState?.totalQuestions?.[userLesson?.lesson?.id] || EEmpty.ZERO;
                      const totalDoExerciseTime =
                        myCourseExerciseState?.tests?.filter(
                          (test) =>
                            test?.userLesson?.id === userLesson.id || test?.lesson?.name === userLesson?.lesson?.name,
                        ).length || EEmpty.ZERO;

                      return `${totalQuestion} câu hỏi - ${totalDoExerciseTime} lần làm bài tập`;
                    }}
                  />
                </div>
              </Col>
            </Row>
          </div>
        )}
      </div>
    </>
  );
};

export default LearnDetail;

LearnDetail.getLayout = function (page: React.ReactNode) {
  return (
    <>
      <SEO />
      <Student>{page}</Student>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => ServerProtectedRoute(context);
