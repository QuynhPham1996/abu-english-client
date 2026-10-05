import React, { useCallback, useEffect } from 'react';
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';

import SEO from '@/components/SEO';
import Student from '@/layouts/Student';
import Table from '@/components/Table';
import Input from '@/components/Input';
import Select from '@/components/Select';
import Button, { EButtonStyleType } from '@/components/Button';
import Icon, { EIconName, EIconColor } from '@/components/Icon';
import Tag, { ETagType } from '@/components/Tag';
import Tooltip from '@/components/Tooltip';
import Breadcrumb from '@/components/Breadcrumb';
import Loading from '@/components/Loading';
import { Paths } from '@/routers/constants';
import { useModalState, usePaginationTool } from '@/utils/hooks';
import { EGetQuestionBankAction, getQuestionBankAction, getQuestionGroupAction } from '@/redux/actions';
import { TRootState } from '@/redux/reducers';
import { DEFAULT_PAGE, dataLessonStatusOptions, dataLessonTypeOptions } from '@/common/constants';
import { EEmpty } from '@/common/enums';
import { TQuestion } from '@/common/models';
import { TGetQuestionBankResponse } from '@/services/api';
import { ServerProtectedRoute } from '@/utils/server-side';
import ModalQuestionBankForm from '@/containers/ModalQuestionBankForm';
import ModalDeleteQuestionBank from '@/containers/ModalDeleteQuestionBank';
import ModalQuestionGroupForm from '@/containers/ModalQuestionGroupForm';
import ModalDeleteQuestionGroup from '@/containers/ModalDeleteQuestionGroup';

const QuestionGroupDetailManagement = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const id = router.query?.id as string;

  const groupState = useSelector((state: TRootState) => state.questionGroupReducer.getQuestionGroupResponse)?.data;

  const [deleteQuestionModalState, handleOpenDeleteQuestionModal, handleCloseDeleteQuestionModal] = useModalState();
  const [questionFormModalState, handleOpenQuestionFormModal, handleCloseQuestionFormModal] = useModalState();
  const [groupFormModalState, handleOpenGroupFormModal, handleCloseGroupFormModal] = useModalState();
  const [deleteGroupModalState, handleOpenDeleteGroupModal, handleCloseDeleteGroupModal] = useModalState();

  const {
    paramsRequest,
    setParamsRequest,
    loading,
    state,
    getData,
    handlePaginationChange,
    handleSearch,
  } = usePaginationTool({
    availableToCall: Boolean(id),
    initialParams: { groupId: id },
    action: getQuestionBankAction,
    reducer: 'questionBankReducer',
    response: 'getQuestionBankResponse',
    loadingAction: EGetQuestionBankAction.GET_QUESTION_BANK,
  });

  const questionsState = state as TGetQuestionBankResponse;
  const isCurrentGroup = groupState?.id === id;
  const groupStatus = dataLessonStatusOptions.find((option) => option.value === groupState?.status);

  const dataBreadcrumb = [
    { key: 'question-groups', title: 'Nhóm câu hỏi', href: Paths.QuestionGroupsManagement },
    { key: 'question-group-detail', title: groupState?.name || 'Chi tiết nhóm' },
  ];

  const getGroup = useCallback(() => {
    if (id) dispatch(getQuestionGroupAction.request({ paths: { id } }));
  }, [id, dispatch]);

  const refresh = (): void => {
    getData();
    getGroup();
  };

  useEffect(() => {
    getGroup();
  }, [getGroup]);

  const columns = [
    {
      key: 'question',
      dataIndex: 'question',
      title: 'Câu hỏi',
      render: (_: string, record: TQuestion): React.ReactElement => (
        <div className="Table-info-title ellipsis-1" dangerouslySetInnerHTML={{ __html: record?.question || '' }} />
      ),
    },
    {
      key: 'children',
      dataIndex: 'children',
      title: 'Câu con',
      render: (_: string, record: TQuestion): React.ReactElement => <>{record.children?.length || EEmpty.ZERO}</>,
    },
    {
      key: 'type',
      dataIndex: 'type',
      title: 'Loại',
      render: (_: string, record: TQuestion): React.ReactElement => {
        const type = dataLessonTypeOptions.find((option) => option.value === record?.type);
        return <Tag type={ETagType.GENERAL} title={type?.label} iconName={type?.data?.iconName} size="small" />;
      },
    },
    {
      key: 'actions',
      dataIndex: 'actions',
      title: 'Thao tác',
      width: 40,
      fixed: 'right',
      render: (_: string, record: TQuestion): React.ReactElement => (
        <div onClick={(e): void => e.stopPropagation()}>
          <Row gutter={[8, 8]} wrap={false}>
            <Col>
              <Tooltip title="Sửa câu hỏi">
                <Button
                  iconName={EIconName.Pencil}
                  iconColor={EIconColor.SHARK}
                  size="small"
                  styleType={EButtonStyleType.OUTLINE_GEYSER}
                  onClick={(): void => handleOpenQuestionFormModal(record)}
                />
              </Tooltip>
            </Col>
            <Col>
              <Tooltip title="Xoá câu hỏi">
                <Button
                  iconName={EIconName.Trash}
                  iconColor={EIconColor.SHARK}
                  size="small"
                  styleType={EButtonStyleType.OUTLINE_GEYSER}
                  onClick={(): void => handleOpenDeleteQuestionModal(record)}
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
      <div className="QuestionGroupDetailManagement">
        <div className="QuestionGroupDetailManagement-wrapper">
          {!isCurrentGroup ? (
            <div className="QuestionGroupDetailManagement-table flex items-center justify-center">
              <Loading />
            </div>
          ) : (
            <div className="QuestionGroupDetailManagement-table">
              <Breadcrumb options={dataBreadcrumb} />

              <div className="QuestionGroupDetailManagement-header">
                <Row gutter={[16, 16]} justify="space-between" align="middle" wrap={false}>
                  <Col>
                    <div className="QuestionGroupDetailManagement-title">{groupState?.name}</div>
                    <Tag
                      iconName={EIconName.BrandRedux}
                      iconColor={groupStatus?.data?.color}
                      title={groupStatus?.label}
                      size="small"
                      type={groupStatus?.data?.tagType}
                    />
                    {groupState?.description && (
                      <div className="QuestionGroupDetailManagement-description">{groupState.description}</div>
                    )}
                  </Col>
                  <Col>
                    <Row gutter={[8, 8]} wrap={false}>
                      <Col>
                        <Button
                          title="Sửa"
                          size="small"
                          iconName={EIconName.Pencil}
                          iconColor={EIconColor.SHARK}
                          styleType={EButtonStyleType.OUTLINE_GEYSER}
                          onClick={(): void => handleOpenGroupFormModal(groupState)}
                        />
                      </Col>
                      <Col>
                        <Button
                          title="Xoá"
                          size="small"
                          iconName={EIconName.Trash}
                          iconColor={EIconColor.SHARK}
                          styleType={EButtonStyleType.OUTLINE_GEYSER}
                          onClick={(): void => handleOpenDeleteGroupModal(groupState)}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>

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
                            title="Tạo câu hỏi"
                            iconName={EIconName.Plus}
                            iconColor={EIconColor.WHITE}
                            styleType={EButtonStyleType.PRIMARY}
                            onClick={handleOpenQuestionFormModal}
                          />
                        </Col>
                      </Row>
                    </Col>
                    <Col span={24}>
                      <div className="Table-total-item">
                        <Icon name={EIconName.Help} color={EIconColor.SHARK} />
                        Tổng câu hỏi: <strong>{questionsState?.paginate?.total || EEmpty.ZERO}</strong>
                      </div>
                    </Col>
                  </Row>
                }
                columns={columns}
                dataSources={questionsState?.data}
                page={paramsRequest.page}
                pageSize={paramsRequest.pageSize}
                total={questionsState?.paginate?.total}
                loading={loading}
                onPaginationChange={handlePaginationChange}
              />
            </div>
          )}
        </div>
      </div>

      <ModalQuestionBankForm
        {...questionFormModalState}
        groups={groupState ? [groupState] : []}
        lockGroup
        onClose={handleCloseQuestionFormModal}
        onSuccess={refresh}
      />
      <ModalDeleteQuestionBank
        {...deleteQuestionModalState}
        onClose={handleCloseDeleteQuestionModal}
        onSuccess={refresh}
      />
      <ModalQuestionGroupForm
        {...groupFormModalState}
        onClose={handleCloseGroupFormModal}
        onSuccess={getGroup}
      />
      <ModalDeleteQuestionGroup
        {...deleteGroupModalState}
        onClose={handleCloseDeleteGroupModal}
        onSuccess={(): void => {
          router.push(Paths.QuestionGroupsManagement);
        }}
      />
    </>
  );
};

export default QuestionGroupDetailManagement;

QuestionGroupDetailManagement.getLayout = function (page: React.ReactNode) {
  return (
    <>
      <SEO />
      <Student>{page}</Student>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => ServerProtectedRoute(context);
