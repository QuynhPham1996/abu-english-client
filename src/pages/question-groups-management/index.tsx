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
import Tag from '@/components/Tag';
import Select from '@/components/Select';
import { useModalState, usePaginationTool } from '@/utils/hooks';
import { EGetQuestionGroupsAction, getQuestionGroupsAction } from '@/redux/actions';
import { DEFAULT_PAGE, dataLessonStatusOptions } from '@/common/constants';
import { TQuestionGroup } from '@/common/models';
import { TGetQuestionGroupsResponse } from '@/services/api';
import { Paths } from '@/routers/constants';
import { ServerProtectedRoute } from '@/utils/server-side';
import { GetServerSideProps } from 'next';
import ModalQuestionGroupForm from '@/containers/ModalQuestionGroupForm';
import ModalDeleteQuestionGroup from '@/containers/ModalDeleteQuestionGroup';

const QuestionGroupsManagement = () => {
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
    action: getQuestionGroupsAction,
    reducer: 'questionGroupReducer',
    response: 'getQuestionGroupsResponse',
    loadingAction: EGetQuestionGroupsAction.GET_QUESTION_GROUPS,
  });

  const groupsState = state as TGetQuestionGroupsResponse;

  const columns = [
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Nhóm câu hỏi',
      sorter: true,
      keySort: 'name',
      render: (_: string, record: TQuestionGroup): React.ReactElement => (
        <div className="Table-info">
          <div className="Table-info-title ellipsis-1">{record?.name}</div>
          <div className="Table-info-description small ellipsis-1">{record?.description}</div>
        </div>
      ),
    },
    {
      key: 'questionCount',
      dataIndex: 'questionCount',
      title: 'Số câu hỏi',
      className: 'nowrap',
      render: (_: string, record: TQuestionGroup): React.ReactElement => (
        <>{groupsState?.totalQuestions?.[record.id] || EEmpty.ZERO}</>
      ),
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: 'Trạng thái',
      sorter: true,
      keySort: 'status',
      render: (_: string, record: TQuestionGroup): React.ReactElement => {
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
      render: (_: string, record: TQuestionGroup): React.ReactElement => (
        <div onClick={(e): void => e.stopPropagation()}>
          <Row gutter={[8, 8]} wrap={false}>
            <Col>
              <Tooltip title="Xem câu hỏi">
                <Button
                  iconName={EIconName.Eye}
                  iconColor={EIconColor.SHARK}
                  size="small"
                  styleType={EButtonStyleType.OUTLINE_GEYSER}
                  link={Paths.QuestionGroupDetailManagement(record.id)}
                />
              </Tooltip>
            </Col>
            <Col>
              <Tooltip title="Sửa nhóm">
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
              <Tooltip title="Xoá nhóm">
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
      <div className="QuestionGroupsManagement">
        <div className="QuestionGroupsManagement-wrapper">
          <div className="QuestionGroupsManagement-table">
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
                        </Row>
                      </Col>
                      <Col>
                        <Button
                          title="Tạo nhóm câu hỏi"
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
                      <Icon name={EIconName.UsersGroup} color={EIconColor.SHARK} />
                      Tổng nhóm: <strong>{groupsState?.paginate?.total || EEmpty.ZERO}</strong>
                    </div>
                  </Col>
                </Row>
              }
              columns={columns}
              dataSources={groupsState?.data}
              page={paramsRequest.page}
              pageSize={paramsRequest.pageSize}
              total={groupsState?.paginate?.total}
              loading={loading}
              onPaginationChange={handlePaginationChange}
            />
          </div>
        </div>
      </div>

      <ModalQuestionGroupForm {...formModalState} onClose={handleCloseFormModal} onSuccess={getData} />
      <ModalDeleteQuestionGroup {...deleteModalState} onClose={handleCloseDeleteModal} onSuccess={getData} />
    </>
  );
};

export default QuestionGroupsManagement;

QuestionGroupsManagement.getLayout = function (page: React.ReactNode) {
  return (
    <>
      <SEO />
      <Student>{page}</Student>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => ServerProtectedRoute(context);
