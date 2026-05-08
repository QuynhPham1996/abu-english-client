import React from 'react';
import { Row, Col } from 'antd';

import Student from '@/layouts/Student';
import SEO from '@/components/SEO';
import Table from '@/components/Table';
import Input from '@/components/Input';
import Button, { EButtonStyleType } from '@/components/Button';
import { EEmpty } from '@/common/enums';
import Icon, { EIconName, EIconColor } from '@/components/Icon';
import Tooltip from '@/components/Tooltip';
import Avatar from '@/components/Avatar';
import Tag, { ETagType } from '@/components/Tag';
import { useModalState, usePaginationTool } from '@/utils/hooks';
import ModalDeleteCourse from '@/containers/ModalDeleteCourse';
import ModalCourseForm from '@/containers/ModalCourseForm';
import Select from '@/components/Select';
import { Paths } from '@/routers/constants';
import { EGetCoursesAction, getCoursesAction } from '@/redux/actions';
import { DEFAULT_PAGE, dataCourseLevelOptions, dataCourseStatusOptions } from '@/common/constants';
import { formatCurrency, formatVideoDuration, getFullPath } from '@/utils/functions';
import { TCourse } from '@/common/models';
import { TGetCoursesResponse } from '@/services/api';
import { ServerProtectedRoute } from '@/utils/server-side';
import { GetServerSideProps } from 'next';

const CoursesManagement = () => {
  const [deleteCourseModalState, handleOpenDeleteCourseModal, handleCloseDeleteCourseModal] = useModalState();
  const [courseFormModalState, handleOpenCourseFormModal, handleCloseCourseFormModal] = useModalState();

  const {
    paramsRequest: getCoursesParamsRequest,
    setParamsRequest: setGetCoursesParamsRequest,
    loading: getCoursesLoading,
    state: coursesState,
    getData: getCourses,
    handlePaginationChange: handlePaginationCoursesChange,
    handleSearch: handleSearchCourses,
  } = usePaginationTool({
    action: getCoursesAction,
    reducer: 'courseReducer',
    response: 'getCoursesResponse',
    loadingAction: EGetCoursesAction.GET_COURSES,
  });

  const columns = [
    {
      key: 'image',
      dataIndex: 'image',
      title: 'Ảnh',
      width: 36,
      render: (_: string, record: TCourse): React.ReactElement => (
        <div className="Table-image">
          <Avatar size={36} shape="square" image={getFullPath(record?.image)} />
        </div>
      ),
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Khoá học',
      className: 'limit-width-large',
      sorter: true,
      keySort: 'name',
      render: (_: string, record: TCourse): React.ReactElement => (
        <div className="Table-info">
          <div className="Table-info-title ellipsis-1">{record?.name}</div>
          <div className="Table-info-description small ellipsis-1">{record?.description}</div>
        </div>
      ),
    },
    {
      key: 'price',
      dataIndex: 'price',
      title: 'Giá',
      sorter: true,
      keySort: 'sellingPrice',
      className: 'nowrap',
      render: (_: string, record: TCourse): React.ReactElement => (
        <div className="Table-info">
          {record.retailPrice && (
            <div className="Table-info-description small">
              <del>{formatCurrency(record.retailPrice, true)}</del>
            </div>
          )}
          <div className="Table-info-title">{formatCurrency(record.sellingPrice, true)}</div>
        </div>
      ),
    },
    {
      key: 'exerciseCount',
      dataIndex: 'exerciseCount',
      title: 'Số bài học',
      className: 'nowrap',
      render: (_: string, record: TCourse): React.ReactElement => (
        <>{(coursesState as TGetCoursesResponse)?.totalExercises?.[record.id] || EEmpty.ZERO}</>
      ),
    },
    {
      key: 'duration',
      dataIndex: 'duration',
      title: 'Thời lượng',
      className: 'nowrap',
      render: (_: string, record: TCourse): React.ReactElement => {
        const duration = (coursesState as TGetCoursesResponse)?.totalDurations?.[record.id];

        if (duration) {
          return (
            <Tag
              size="small"
              iconName={EIconName.Alarm}
              iconColor={EIconColor.SHARK}
              type={ETagType.GENERAL}
              title={formatVideoDuration(duration)}
            />
          );
        }

        return <>{EEmpty.DASH}</>;
      },
    },
    {
      key: 'manager',
      dataIndex: 'manager',
      title: 'Giảng viên',
      sorter: true,
      keySort: 'manager.name',
      render: (_: string, record: TCourse): React.ReactElement => {
        if (!record?.manager?.id) return <>{EEmpty.DASH}</>;

        return (
          <Row gutter={[8, 8]} align="middle" wrap={false}>
            <Col>
              <Avatar
                name={record?.manager?.name}
                image={getFullPath(record?.manager?.avatar)}
                size={36}
                textSize="small"
              />
            </Col>
            <Col>
              <div className="Table-info nowrap">
                <div className="Table-info-title">{record?.manager?.name}</div>
                <div className="Table-info-description small">{record?.manager?.username}</div>
              </div>
            </Col>
          </Row>
        );
      },
    },
    {
      key: 'level',
      dataIndex: 'level',
      title: 'Cấp độ',
      sorter: true,
      keySort: 'level',
      render: (_: string, record: TCourse): React.ReactElement => {
        const status = dataCourseLevelOptions.find((option) => option.value === record?.level);

        return (
          <Tag
            iconName={EIconName.AntennaBars}
            iconColor={status?.data?.color}
            title={status?.label}
            size="small"
            type={status?.data?.tagType}
          />
        );
      },
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: 'Trạng thái',
      sorter: true,
      keySort: 'status',
      render: (_: string, record: TCourse): React.ReactElement => {
        const status = dataCourseStatusOptions.find((option) => option.value === record?.status);

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
      key: 'actions',
      dataIndex: 'actions',
      title: 'Thao tác',
      width: 40,
      fixed: 'right',
      render: (_: string, record: TCourse): React.ReactElement => (
        <div onClick={(e): void => e.stopPropagation()}>
          <Row gutter={[8, 8]} wrap={false}>
            <Col>
              <Tooltip title="Xem chi tiết">
                <Button
                  iconName={EIconName.Eye}
                  iconColor={EIconColor.SHARK}
                  size="small"
                  styleType={EButtonStyleType.OUTLINE_GEYSER}
                  link={Paths.CourseDetailManagement(record.id)}
                />
              </Tooltip>
            </Col>
            <Col>
              <Tooltip title="Sửa khoá học">
                <Button
                  iconName={EIconName.Pencil}
                  iconColor={EIconColor.SHARK}
                  size="small"
                  styleType={EButtonStyleType.OUTLINE_GEYSER}
                  onClick={(): void => handleOpenCourseFormModal(record)}
                />
              </Tooltip>
            </Col>
            <Col>
              <Tooltip title="Xoá khoá học">
                <Button
                  iconName={EIconName.Trash}
                  iconColor={EIconColor.SHARK}
                  size="small"
                  styleType={EButtonStyleType.OUTLINE_GEYSER}
                  onClick={(): void => handleOpenDeleteCourseModal(record)}
                />
              </Tooltip>
            </Col>
          </Row>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="CoursesManagement">
        <div className="CoursesManagement-wrapper">
          <div className="CoursesManagement-table">
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
                              onSearch={handleSearchCourses}
                            />
                          </Col>
                          <Col>
                            <Select
                              placeholder="Trạng thái"
                              allowClear
                              options={dataCourseStatusOptions}
                              onChange={(option): void => {
                                setGetCoursesParamsRequest({
                                  ...getCoursesParamsRequest,
                                  page: DEFAULT_PAGE,
                                  status: option?.value,
                                });
                              }}
                            />
                          </Col>
                          <Col>
                            <Select
                              placeholder="Cấp độ"
                              allowClear
                              options={dataCourseLevelOptions}
                              onChange={(option): void => {
                                setGetCoursesParamsRequest({
                                  ...getCoursesParamsRequest,
                                  page: DEFAULT_PAGE,
                                  level: option?.value,
                                });
                              }}
                            />
                          </Col>
                        </Row>
                      </Col>

                      <Col>
                        <Row gutter={[16, 16]}>
                          <Col>
                            <Button
                              title="Tạo mới Khoá học"
                              iconName={EIconName.Plus}
                              iconColor={EIconColor.WHITE}
                              styleType={EButtonStyleType.PRIMARY}
                              onClick={handleOpenCourseFormModal}
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
                          <Icon name={EIconName.Books} color={EIconColor.SHARK} />
                          Tổng Khoá Học: <strong>{coursesState?.paginate?.total || EEmpty.ZERO}</strong>
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              }
              columns={columns}
              dataSources={coursesState?.data}
              page={getCoursesParamsRequest.page}
              pageSize={getCoursesParamsRequest.pageSize}
              total={coursesState?.paginate?.total}
              loading={getCoursesLoading}
              onPaginationChange={handlePaginationCoursesChange}
            />
          </div>
        </div>
      </div>

      <ModalCourseForm {...courseFormModalState} onClose={handleCloseCourseFormModal} onSuccess={getCourses} />
      <ModalDeleteCourse {...deleteCourseModalState} onClose={handleCloseDeleteCourseModal} onSuccess={getCourses} />
    </>
  );
};

export default CoursesManagement;

CoursesManagement.getLayout = function (page: React.ReactNode) {
  return (
    <>
      <SEO />
      <Student>{page}</Student>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => ServerProtectedRoute(context);
