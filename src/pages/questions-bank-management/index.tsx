import React, { useEffect } from 'react';
import { Row, Col } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

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
import { EGetQuestionBankAction, EGetQuestionGroupsAction, getQuestionBankAction, getQuestionGroupsAction } from '@/redux/actions';
import { DEFAULT_PAGE, dataLessonTypeOptions } from '@/common/constants';
import { TQuestion } from '@/common/models';
import { TGetQuestionBankResponse, TGetQuestionGroupsResponse } from '@/services/api';
import { ServerProtectedRoute } from '@/utils/server-side';
import { GetServerSideProps } from 'next';
import { TRootState } from '@/redux/reducers';
import ModalQuestionBankForm from '@/containers/ModalQuestionBankForm';
import ModalDeleteQuestionBank from '@/containers/ModalDeleteQuestionBank';

const QuestionsBankManagement = () => {
  const dispatch = useDispatch();
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
    action: getQuestionBankAction,
    reducer: 'questionBankReducer',
    response: 'getQuestionBankResponse',
    loadingAction: EGetQuestionBankAction.GET_QUESTION_BANK,
  });

  const questionsState = state as TGetQuestionBankResponse;
  const groupsState = useSelector(
    (state: TRootState) => state.questionGroupReducer.getQuestionGroupsResponse,
  ) as TGetQuestionGroupsResponse | undefined;
  const groups = groupsState?.data || [];
  const groupOptions = groups.map((item) => ({ label: item.name, value: item.id }));

  useEffect(() => {
    dispatch(
      getQuestionGroupsAction.request({
        params: { page: 1, pageSize: 100 },
      }),
    );
  }, [dispatch]);

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
      key: 'group',
      dataIndex: 'group',
      title: 'Nhóm',
      className: 'limit-width-middle',
      render: (_: string, record: TQuestion): React.ReactElement => {
        const groupName = typeof record?.group === 'object' ? record?.group?.name : EEmpty.DASH;
        return <>{groupName || EEmpty.DASH}</>;
      },
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
        return (
          <Tag
            type={ETagType.GENERAL}
            title={type?.label}
            iconName={type?.data?.iconName}
            size="small"
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
                  onClick={(): void => handleOpenFormModal(record)}
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
      <div className="QuestionsBankManagement">
        <div className="QuestionsBankManagement-wrapper">
          <div className="QuestionsBankManagement-table">
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
                              placeholder="Nhóm câu hỏi"
                              allowClear
                              options={groupOptions}
                              onChange={(option): void => {
                                setParamsRequest({
                                  ...paramsRequest,
                                  page: DEFAULT_PAGE,
                                  groupId: option?.value,
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
                          title="Tạo câu hỏi"
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
        </div>
      </div>

      <ModalQuestionBankForm
        {...formModalState}
        groups={groups}
        onClose={handleCloseFormModal}
        onSuccess={getData}
      />
      <ModalDeleteQuestionBank {...deleteModalState} onClose={handleCloseDeleteModal} onSuccess={getData} />
    </>
  );
};

export default QuestionsBankManagement;

QuestionsBankManagement.getLayout = function (page: React.ReactNode) {
  return (
    <>
      <SEO />
      <Student>{page}</Student>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => ServerProtectedRoute(context);
