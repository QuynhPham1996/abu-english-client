import React from 'react';
import Wave from 'react-wavify';

import Student from '@/layouts/Student';
import SEO from '@/components/SEO';
import { EIconColor, EIconName } from '@/components/Icon';
import Table from '@/components/Table';
import Tag, { ETagType } from '@/components/Tag';
import { Col, Row } from 'antd';
import Button, { EButtonStyleType } from '@/components/Button';
import Tooltip from '@/components/Tooltip';
import { formatISODateToDateTime, formatVideoDuration, randomIntFromInterval } from '@/utils/functions';
import Link from 'next/link';
import { Paths } from '@/routers/constants';
import { ServerProtectedRoute } from '@/utils/server-side';
import { GetServerSideProps } from 'next';
import { usePaginationTool } from '@/utils/hooks';
import { EGetTestsUserAction, getTestsUserAction } from '@/redux/actions';
import { TTest } from '@/common/models';
import { dataLessonTypeOptions, dataResultTypeOptions, dataTestStatusOptions } from '@/common/constants';
import { EEmpty, EFormat, ETestStatus } from '@/common/enums';
import { TGetTestsUserResponse } from '@/services/api';

const Exercises = () => {
  const {
    paramsRequest: getTestsUserParamsRequest,
    loading: getTestsUserLoading,
    state: testsUserState,
    handlePaginationChange: handlePaginationTestsUserChange,
  } = usePaginationTool({
    action: getTestsUserAction,
    reducer: 'testReducer',
    response: 'getTestsUserResponse',
    loadingAction: EGetTestsUserAction.GET_TESTS_USER,
  });

  const testsUserStateResponse = testsUserState as TGetTestsUserResponse;
  const doneLessons = testsUserStateResponse?.passUserLessons || 0;
  const requiredLessons = testsUserStateResponse?.totalUserLessons || 0;
  const averageScore = Math.floor(testsUserStateResponse?.averageScore || 0);

  const dataSummary = [
    {
      key: 'average',
      value: averageScore,
      title: `${averageScore}%`,
      description: 'Điểm trung bình',
      color: EIconColor.MOUNTAIN_MEADOW,
    },
    {
      key: 'exercises',
      value: requiredLessons ? Math.floor((doneLessons / requiredLessons) * 100) : 0,
      title: `${doneLessons}/${requiredLessons}`,
      description: 'Bài tập đã làm',
      color: EIconColor.SUNGLOW,
    },
    {
      key: 'total',
      value: 100,
      title: testsUserStateResponse?.totalAttempts || 0,
      description: 'Tổng số lần làm bài tập',
      color: EIconColor.ALIZARIN_CRIMSON,
    },
  ];

  const columns = [
    {
      key: 'exercise',
      dataIndex: 'exercise',
      title: 'Bài tập',
      className: 'limit-width-large',
      sorter: true,
      keySort: 'exercise.name',
      render: (_: string, record: TTest): React.ReactElement => (
        <div className="Table-info">
          <div className="Table-info-title ellipsis-1">{record?.lesson?.name}</div>
          <Link href={Paths.LearnDetail(record?.userExercise?.id)} className="Table-link Table-info-description bold">
            Xem bài học
          </Link>
        </div>
      ),
    },
    {
      key: 'course',
      dataIndex: 'course',
      title: 'Khoá học',
      sorter: true,
      keySort: 'course.name',
      className: 'limit-width-large',
      render: (_: string, record: TTest): React.ReactElement => (
        <div className="Table-info">
          <div className="Table-info-title ellipsis-1">
            {record?.lesson?.exercise?.course?.name || record?.lesson?.course?.name}
          </div>
          {record?.lesson?.exercise?.name && (
            <div className="Table-info-description">Bài học: {record?.lesson?.exercise?.name}</div>
          )}
        </div>
      ),
    },
    {
      key: 'result',
      dataIndex: 'result',
      title: 'Kết quả',
      className: 'nowrap',
      sorter: true,
      keySort: 'result',
      render: (_: string, record: TTest): React.ReactElement => {
        const isGraded = record.status === ETestStatus.SUCCESS;
        const resultType = dataResultTypeOptions.find((item) => record.result >= item.data.percent);

        return isGraded ? (
          <div className="Table-info">
            <div className="Table-info-title">{record?.result}%</div>
            <div className="Table-info-description bold" style={{ color: resultType?.data?.color }}>
              {resultType?.label}
            </div>
          </div>
        ) : (
          <>{EEmpty.DASH}</>
        );
      },
    },
    {
      key: 'type',
      dataIndex: 'type',
      title: 'Loại bài tập',
      sorter: true,
      keySort: 'lesson.type',
      className: 'nowrap',
      render: (_: string, record: TTest): React.ReactElement => {
        const lessonType = dataLessonTypeOptions.find((option) => option.value === record?.lesson?.type);
        return (
          <Tag title={lessonType?.label} size="small" type={ETagType.GENERAL} iconName={lessonType?.data?.iconName} />
        );
      },
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: 'Trạng thái',
      keySort: 'status',
      sorter: true,
      render: (_: string, record: TTest): React.ReactElement => {
        const status = dataTestStatusOptions.find((option) => option.value === record?.status);

        return (
          <Tag
            iconName={EIconName.BrandRedux}
            iconColor={status?.data?.color}
            title={status?.label}
            size="small"
            type={status?.data?.tagType}
          />
        );
      },
    },
    {
      key: 'duration',
      dataIndex: 'duration',
      title: 'Thời gian làm bài',
      sorter: true,
      keySort: 'duration',
      className: 'nowrap',
      render: (_: string, record: TTest): React.ReactElement => {
        return (
          <Tag
            iconName={EIconName.Alarm}
            iconColor={EIconColor.SHARK}
            title={formatVideoDuration(record?.duration)}
            size="small"
            type={ETagType.GENERAL}
          />
        );
      },
    },
    {
      key: 'createdAt',
      dataIndex: 'createdAt',
      sorter: true,
      keySort: 'createdAt',
      title: 'Thời gian nộp bài',
      className: 'nowrap',
      render: (_: string, record: TTest): React.ReactElement => (
        <>{formatISODateToDateTime(record.createdAt, EFormat['DD/MM/YYYY - HH:mm'])}</>
      ),
    },
    {
      key: 'actions',
      dataIndex: 'actions',
      title: 'Thao tác',
      width: 40,
      fixed: 'right',
      render: (_: string, record: TTest): React.ReactElement => {
        const isGraded = record.status === ETestStatus.SUCCESS;

        return (
          <div onClick={(e): void => e.stopPropagation()}>
            <Row gutter={[8, 8]} wrap={false} justify="end">
              {isGraded && (
                <Col>
                  <Tooltip title="Xem chi tiết">
                    <Button
                      iconName={EIconName.Eye}
                      iconColor={EIconColor.SHARK}
                      size="small"
                      styleType={EButtonStyleType.OUTLINE_GEYSER}
                      link={Paths.ExerciseDetail(record.id)}
                    />
                  </Tooltip>
                </Col>
              )}

              <Col>
                <Tooltip title="Làm lại">
                  <Button
                    iconName={EIconName.Reload}
                    iconColor={EIconColor.SHARK}
                    size="small"
                    styleType={EButtonStyleType.OUTLINE_GEYSER}
                    link={Paths.DoExercise(record?.userLesson?.id)}
                  />
                </Tooltip>
              </Col>
            </Row>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="Exercises">
        <div className="Exercises-wrapper">
          <div className="Exercises-summary">
            <Row gutter={[16, 16]}>
              {dataSummary.map((item) => {
                return (
                  <Col key={item.key} span={8}>
                    <div className="Exercises-summary-item flex items-center justify-center">
                      <div
                        className="Exercises-summary-item-bar"
                        style={{
                          boxShadow: `0 0 0 .4rem ${item.color}`,
                        }}
                      >
                        <Wave
                          fill={item.color}
                          options={{
                            height: 100 - item.value,
                            amplitude: 2,
                            speed: randomIntFromInterval(0.4, 0.5),
                            points: 3,
                          }}
                        />
                      </div>
                      <div className="Exercises-summary-item-info">
                        <div className="Exercises-summary-item-info-title">{item.title}</div>
                        <div className="Exercises-summary-item-info-description">{item.description}</div>
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>
          </div>

          <div className="Exercises-table">
            <Table
              columns={columns}
              dataSources={testsUserState?.data}
              page={getTestsUserParamsRequest?.page}
              pageSize={getTestsUserParamsRequest?.pageSize}
              total={testsUserState?.paginate?.total}
              loading={getTestsUserLoading}
              onPaginationChange={handlePaginationTestsUserChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Exercises;

Exercises.getLayout = function (page: React.ReactNode) {
  return (
    <>
      <SEO />
      <Student>{page}</Student>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => ServerProtectedRoute(context);
