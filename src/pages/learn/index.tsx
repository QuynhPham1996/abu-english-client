import React, { useCallback, useEffect } from 'react';
import { Collapse, CollapsePanelProps, CollapseProps } from 'antd';

import Student from '@/layouts/Student';
import SEO from '@/components/SEO';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import { Paths } from '@/routers/constants';
import ImageLearnEmpty from '@/assets/images/image-learn-empty.svg';
import EmptyScreen from '@/components/EmptyScreen';
import { useDispatch, useSelector } from 'react-redux';
import { TRootState } from '@/redux/reducers';
import { EGetMyCoursesAction, getMyCoursesAction } from '@/redux/actions';
import { caculateProcessPercent, parseLoadingAction } from '@/utils/functions';
import Loading from '@/components/Loading';
import { ServerProtectedRoute } from '@/utils/server-side';
import { GetServerSideProps } from 'next';
import { EEmpty } from '@/common/enums';
import TableContentExercise from '@/containers/TableContentExercise';

const { Panel } = Collapse;

const CollapseModify: React.FC<CollapseProps & { children?: React.ReactNode }> = Collapse;
const PanelModify: React.FC<CollapsePanelProps & { children?: React.ReactNode }> = Panel;

const Learn = () => {
  const dispatch = useDispatch();

  const getMyCoursesLoading = parseLoadingAction(
    useSelector((state: TRootState) => state.loadingReducer[EGetMyCoursesAction.GET_MY_COURSES]),
  );
  const myCoursesState = useSelector((state: TRootState) => state.courseReducer.getMyCoursesResponse)?.data;
  const isEmpty = myCoursesState?.length === 0;

  const getMyCourses = useCallback(() => {
    dispatch(getMyCoursesAction.request({}));
  }, [dispatch]);

  useEffect(() => {
    getMyCourses();
  }, [getMyCourses]);

  return (
    <>
      <div className="Learn">
        {getMyCoursesLoading ? (
          <div className="Learn-loading flex items-center justify-center">
            <Loading />
          </div>
        ) : (
          <div className="Learn-wrapper">
            {isEmpty ? (
              <EmptyScreen
                image={ImageLearnEmpty}
                title={
                  <>
                    Bạn chưa sở hữu khoá học nào trong tài khoản. <br />
                    Vui lòng truy cập trang{' '}
                    <strong>
                      <a href="https://www.facebook.com/profile.php?id=61552926075305" target="_blank">
                        Abu English Club
                      </a>
                    </strong>{' '}
                    để liên hệ và được tư vấn.
                  </>
                }
                buttonProps={{
                  title: 'Xem Các Khoá Học',
                  iconName: EIconName.Books,
                  iconColor: EIconColor.WHITE,
                  link: Paths.Courses,
                }}
              />
            ) : (
              <CollapseModify
                className="Learn-courses"
                accordion
                defaultActiveKey={myCoursesState?.map((item) => item.id)}
                expandIconPosition="right"
                expandIcon={(): React.ReactNode => <Icon name={EIconName.AngleDown} color={EIconColor.SHARK} />}
              >
                {myCoursesState?.map((item) => {
                  const totalExercises = Number(item?.userExercises?.length || EEmpty.ZERO);
                  const totalExercisesCompleted = Number(
                    item?.userExercises?.filter((subItem) => subItem.isPass)?.length || EEmpty.ZERO,
                  );

                  const totalLessons = Number(item?.userLessons?.length || EEmpty.ZERO);
                  const totalLessonsCompleted = Number(
                    item?.userLessons?.filter((subItem) => subItem.isPass)?.length || EEmpty.ZERO,
                  );

                  const percent = caculateProcessPercent({
                    totalExercises,
                    totalExercisesCompleted,
                    totalLessons,
                    totalLessonsCompleted,
                  });

                  const totalExercisesFullCompleted = Number(
                    item?.userExercises?.filter((subItem) => {
                      const isAllLessonsCompleted = item?.userLessons
                        ?.filter(
                          (userLesson) =>
                            subItem?.exercise?.lessons?.map((lesson) => lesson.id)?.includes(userLesson?.lesson?.id),
                        )
                        ?.every((subItem) => subItem.isPass);

                      return subItem.isPass && isAllLessonsCompleted;
                    })?.length || EEmpty.ZERO,
                  );

                  return (
                    <PanelModify
                      key={item.id}
                      header={
                        <div className="Learn-courses-header">
                          <h2 className="Learn-courses-header-title">{item.name}</h2>
                          <p className="Learn-courses-header-description">
                            Số bài học hoàn thành: {totalExercisesFullCompleted}/{totalExercises}
                          </p>
                          <div className="Learn-courses-header-progress">
                            <div className="Learn-courses-header-progress-line" style={{ width: `${percent}%` }} />
                            <div className="Learn-courses-header-progress-badge" style={{ left: `${percent}%` }}>
                              {percent}%
                            </div>
                          </div>
                        </div>
                      }
                    >
                      <TableContentExercise userLessons={item?.userLessons} userExercises={item.userExercises} />
                    </PanelModify>
                  );
                })}
              </CollapseModify>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Learn;

Learn.getLayout = function (page: React.ReactNode) {
  return (
    <>
      <SEO />
      <Student>{page}</Student>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => ServerProtectedRoute(context);
