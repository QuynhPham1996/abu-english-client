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
import Tag, { ETagType } from '@/components/Tag';
import Select from '@/components/Select';
import { useModalState, usePaginationTool } from '@/utils/hooks';
import { EGetAssignmentsAction, getAssignmentsAction } from '@/redux/actions';
import { DEFAULT_PAGE, dataLessonStatusOptions, dataLessonTypeOptions } from '@/common/constants';
import { TAssignment } from '@/common/models';
import { TGetAssignmentsResponse } from '@/services/api';
import { Paths } from '@/routers/constants';
import { ServerProtectedRoute } from '@/utils/server-side';
import { GetServerSideProps } from 'next';
import ModalAssignmentForm from '@/containers/ModalAssignmentForm';
import ModalDeleteAssignment from '@/containers/ModalDeleteAssignment';

const AssignmentsManagement = () => {
  const [deleteModalState, handleOpenDeleteModal, handleCloseDeleteModal] = useModalState();
  const [formModalState, handleOpenFormModal, handleCloseFormModal] = useModalState();

  const {
    paramsRequest,
    setParamsRequest,
    loading,
    state,
    getData,
    handlePaginationChange,
    handleSearch,
  } = usePaginationTool({
    action: getAssignmentsAction,
    reducer: 'assignmentReducer',
    response: 'getAssignmentsResponse',
    loadingAction: EGetAssignmentsAction.GET_ASSIGNMENTS,
  });

  const assignmentsState = state as TGetAssignmentsResponse;

  const columns = [
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Bài tập',
      sorter: true,
      keySort: 'name',
      render: (_: string, record: TAssignment): React.ReactElement => (
        <div className="Table-info-title ellipsis-1">{record?.name}</div>
      ),
    },
    {
      key: 'type',
      dataIndex: 'type',
      title: 'Loại',
      sorter: true,
      keySort: 'type',
      render: (_: string, record: TAssignment): React.ReactElement => {
        const type = dataLessonTypeOptions.find((option) => option.value === record?.type);
        return (
          <Tag type={ETagType.GENERAL} title={type?.label} iconName={type?.data?.iconName} size="small" />
        );
      },
    },
    {
      key: 'questionCount',
      dataIndex: 'questionCount',
      title: 'Số câu hỏi',
      className: 'nowrap',
      render: (_: string, record: TAssignment): React.ReactElement => (
        <>{assignmentsState?.totalQuestions?.[record.id] || EEmpty.ZERO}</>
      ),
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: 'Trạng thái',
      sorter: true,
      keySort: 'status',
      render: (_: string, record: TAssignment): React.ReactElement => {
        const status = dataLessonStatusOptions.find((option) => option.value === record?.status);
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
      render: (_: string, record: TAssignment): React.ReactElement => (
        <div onClick={(e): void => e.stopPropagation()}>
          <Row gutter={[8, 8]} wrap={false}>
            <Col>
              <Tooltip title="Xem chi tiết">
                <Button
                  iconName={EIconName.Eye}
                  iconColor={EIconColor.SHARK}
                  size="small"
                  styleType={EButtonStyleType.OUTLINE_GEYSER}
                  link={Paths.AssignmentDetailManagement(record.id)}
                />
              </Tooltip>
            </Col>
            <Col>
              <Tooltip title="Sửa bài tập">
                <Button
                  iconName={EIconName.Pencil}
                  iconColor={EIconColor.SHARK}
                  size="small"
                  styleType={EButtonStyleType.OUTLINE_GEYSER}
                  onClick={(): void => handleOpenFormModal(record)}
                />
              </Tooltip>
            </Col>
            <Col>
              <Tooltip title="Xoá bài tập">
                <Button
                  iconName={EIconName.Trash}
                  iconColor={EIconColor.SHARK}
                  size="small"
                  styleType={EButtonStyleType.OUTLINE_GEYSER}
                  onClick={(): void => handleOpenDeleteModal(record)}
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
      <div className="AssignmentsManagement">
        <div className="AssignmentsManagement-wrapper">
          <div className="AssignmentsManagement-table">
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
                              onSearch={handleSearch}
                            />
                          </Col>
                          <Col>
                            <Select
                              placeholder="Trạng thái"
                              allowClear
                              options={dataLessonStatusOptions}
                              onChange={(option): void => {
                                setParamsRequest({
                                  ...paramsRequest,
                                  page: DEFAULT_PAGE,
                                  status: option?.value,
                                });
                              }}
                            />
                          </Col>
                          <Col>
                            <Select
                              placeholder="Loại"
                              allowClear
                              options={dataLessonTypeOptions}
                              onChange={(option): void => {
                                setParamsRequest({
                                  ...paramsRequest,
                                  page: DEFAULT_PAGE,
                                  type: option?.value,
                                });
                              }}
                            />
                          </Col>
                        </Row>
                      </Col>
                      <Col>
                        <Button
                          title="Tạo bài tập"
                          iconName={EIconName.Plus}
                          iconColor={EIconColor.WHITE}
                          styleType={EButtonStyleType.PRIMARY}
                          onClick={handleOpenFormModal}
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col span={24}>
                    <div className="Table-total-item">
                      <Icon name={EIconName.ClipboardText} color={EIconColor.SHARK} />
                      Tổng bài tập: <strong>{assignmentsState?.paginate?.total || EEmpty.ZERO}</strong>
                    </div>
                  </Col>
                </Row>
              }
              columns={columns}
              dataSources={assignmentsState?.data}
              page={paramsRequest.page}
              pageSize={paramsRequest.pageSize}
              total={assignmentsState?.paginate?.total}
              loading={loading}
              onPaginationChange={handlePaginationChange}
            />
          </div>
        </div>
      </div>

      <ModalAssignmentForm {...formModalState} onClose={handleCloseFormModal} onSuccess={getData} />
      <ModalDeleteAssignment {...deleteModalState} onClose={handleCloseDeleteModal} onSuccess={getData} />
    </>
  );
};

export default AssignmentsManagement;

AssignmentsManagement.getLayout = function (page: React.ReactNode) {
  return (
    <>
      <SEO />
      <Student>{page}</Student>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => ServerProtectedRoute(context);
