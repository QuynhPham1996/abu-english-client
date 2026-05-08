import React from 'react';
import { Row, Col } from 'antd';
import { GetServerSideProps } from 'next';

import Student from '@/layouts/Student';
import SEO from '@/components/SEO';
import Table from '@/components/Table';
import Input from '@/components/Input';
import Button, { EButtonStyleType } from '@/components/Button';
import { EEmpty, EFormat, ETestStatus } from '@/common/enums';
import Icon, { EIconName, EIconColor } from '@/components/Icon';
import Tooltip from '@/components/Tooltip';
import Avatar from '@/components/Avatar';
import Tag, { ETagType } from '@/components/Tag';
import Select from '@/components/Select';
import { ServerProtectedRoute } from '@/utils/server-side';
import { usePaginationTool } from '@/utils/hooks';
import { EGetTestsAction, getTestsAction } from '@/redux/actions';
import { DEFAULT_PAGE, dataLessonTypeOptions, dataResultTypeOptions, dataTestStatusOptions } from '@/common/constants';
import { TTest } from '@/common/models';
import { formatISODateToDateTime, formatVideoDuration, getFullPath } from '@/utils/functions';
import { Paths } from '@/routers/constants';

const ExercisesManagement = () => {
  const {
    paramsRequest: getTestsParamsRequest,
    setParamsRequest: setGetTestsParamsRequest,
    loading: getTestsLoading,
    state: testsState,
    getData: getTests,
    handlePaginationChange: handlePaginationTestsChange,
    handleSearch: handleSearchTests,
  } = usePaginationTool({
    action: getTestsAction,
    reducer: 'testReducer',
    response: 'getTestsResponse',
    loadingAction: EGetTestsAction.GET_TESTS,
  });

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
          <div className="Table-info-description">Bài học: {record?.lesson?.exercise?.name}</div>
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
          <div className="Table-info-title ellipsis-1">{record?.lesson?.exercise?.course?.name}</div>
          <div className="Table-info-description">Giảng viên: {record?.lesson?.exercise?.course?.manager?.name}</div>
        </div>
      ),
    },
    {
      key: 'student',
      dataIndex: 'student',
      title: 'Học viên',
      sorter: true,
      keySort: 'user.name',
      className: 'nowrap',
      render: (_: string, record: TTest): React.ReactElement => (
        <Row gutter={[8, 8]} align="middle" wrap={false}>
          <Col>
            <Avatar name={record?.user?.name} image={getFullPath(record?.user?.avatar)} size={36} textSize="small" />
          </Col>
          <Col>
            <div className="Table-info nowrap">
              <div className="Table-info-title">{record?.user?.name}</div>
              <div className="Table-info-description small">{record?.user?.username}</div>
            </div>
          </Col>
        </Row>
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
              {!isGraded && (
                <Col>
                  <Tooltip title="Chấm bài tập">
                    <Button
                      iconName={EIconName.Highlight}
                      iconColor={EIconColor.SHARK}
                      size="small"
                      styleType={EButtonStyleType.OUTLINE_GEYSER}
                      link={Paths.ExerciseDetail(record.id)}
                    />
                  </Tooltip>
                </Col>
              )}
            </Row>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div className="ExercisesManagement">
        <div className="ExercisesManagement-wrapper">
          <div className="ExercisesManagement-table">
            <Table
              header={
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <Row gutter={[16, 16]} justify="space-between" align="middle">
                      <Col>
                        <Row gutter={[16, 16]} align="middle">
                          <Col>
                            <Input
                              placeholder="Tìm kiếm"
                              suffix={<Icon name={EIconName.Search} color={EIconColor.SHARK} />}
                              onSearch={handleSearchTests}
                            />
                          </Col>
                          <Col>
                            <Select
                              placeholder="Trạng thái"
                              allowClear
                              options={dataTestStatusOptions}
                              onChange={(option): void => {
                                setGetTestsParamsRequest({
                                  ...getTestsParamsRequest,
                                  page: DEFAULT_PAGE,
                                  status: option?.value,
                                });
                              }}
                            />
                          </Col>
                          <Col>
                            <Select
                              placeholder="Loại bài tập"
                              allowClear
                              options={dataLessonTypeOptions}
                              onChange={(option): void => {
                                setGetTestsParamsRequest({
                                  ...getTestsParamsRequest,
                                  page: DEFAULT_PAGE,
                                  type: option?.value,
                                });
                              }}
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                  <Col span={24}>
                    <Row gutter={[16, 16]}>
                      <Col>
                        <div className="Table-total-item">
                          <Icon name={EIconName.NoteBook} color={EIconColor.SHARK} />
                          Tổng Bài Tập: <strong>{testsState?.paginate?.total || EEmpty.ZERO}</strong>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              }
              columns={columns}
              dataSources={testsState?.data}
              page={getTestsParamsRequest.page}
              pageSize={getTestsParamsRequest.pageSize}
              total={testsState?.paginate?.total}
              loading={getTestsLoading}
              onPaginationChange={handlePaginationTestsChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ExercisesManagement;

ExercisesManagement.getLayout = function (page: React.ReactNode) {
  return (
    <>
      <SEO />
      <Student>{page}</Student>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => ServerProtectedRoute(context);
