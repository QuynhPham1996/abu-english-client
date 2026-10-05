import React, { useCallback, useEffect } from 'react';
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import SEO from '@/components/SEO';
import Student from '@/layouts/Student';
import { Paths } from '@/routers/constants';
import Button, { EButtonStyleType } from '@/components/Button';
import Icon, { EIconName, EIconColor } from '@/components/Icon';
import Tag, { ETagType } from '@/components/Tag';
import Breadcrumb from '@/components/Breadcrumb';
import Loading from '@/components/Loading';
import Empty from '@/components/Empty';
import { useModalState } from '@/utils/hooks';
import ModalQuestionForm from '@/containers/ModalQuestionForm';
import ModalDeleteQuestion from '@/containers/ModalDeleteQuestion';
import ModalAssignmentForm from '@/containers/ModalAssignmentForm';
import ModalDeleteAssignment from '@/containers/ModalDeleteAssignment';
import ModalPickBankQuestions from '@/containers/ModalPickBankQuestions';
import ModalPickQuestionGroup from '@/containers/ModalPickQuestionGroup';
import QuestionsSortable from '@/containers/ExercisesManagementCollapse/QuestionsSortable';
import { EGetAssignmentAction, getAssignmentAction } from '@/redux/actions';
import { TRootState } from '@/redux/reducers';
import { parseLoadingAction } from '@/utils/functions';
import { dataLessonArrangeOptions, dataLessonStatusOptions, dataLessonTypeOptions } from '@/common/constants';
import { EEmpty } from '@/common/enums';
import { TLesson, TQuestion } from '@/common/models';
import { ServerProtectedRoute } from '@/utils/server-side';
import { GetServerSideProps } from 'next';

const AssignmentDetailManagement = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const id = router.query?.id as string;

  const assignmentState = useSelector((state: TRootState) => state.assignmentReducer.getAssignmentResponse)?.data;
  const getLoading = parseLoadingAction(
    useSelector((state: TRootState) => state.loadingReducer[EGetAssignmentAction.GET_ASSIGNMENT]),
  );

  const [deleteQuestionModalState, handleOpenDeleteQuestionModal, handleCloseDeleteQuestionModal] = useModalState();
  const [questionFormModalState, handleOpenQuestionFormModal, handleCloseQuestionFormModal] = useModalState();
  const [assignmentFormModalState, handleOpenAssignmentFormModal, handleCloseAssignmentFormModal] = useModalState();
  const [deleteAssignmentModalState, handleOpenDeleteAssignmentModal, handleCloseDeleteAssignmentModal] =
    useModalState();
  const [pickBankModalState, handleOpenPickBankModal, handleClosePickBankModal] = useModalState();
  const [pickGroupModalState, handleOpenPickGroupModal, handleClosePickGroupModal] = useModalState();

  const assignmentStatus = dataLessonStatusOptions.find((option) => option.value === assignmentState?.status);
  const assignmentType = dataLessonTypeOptions.find((option) => option.value === assignmentState?.type);
  const assignmentArrange = dataLessonArrangeOptions.find((option) => option.value === assignmentState?.arrange);
  const questions = (assignmentState?.questions || []) as TQuestion[];
  const isEmpty = questions.length === 0;

  const dataBreadcrumb = [
    { key: 'assignments', title: 'Bài tập', href: Paths.AssignmentsManagement },
    { key: 'assignment-detail', title: assignmentState?.name || 'Chi tiết bài tập' },
  ];

  const getAssignment = useCallback(() => {
    if (id) dispatch(getAssignmentAction.request({ paths: { id } }));
  }, [id, dispatch]);

  useEffect(() => {
    getAssignment();
  }, [getAssignment]);

  return (
    <>
      <div className="AssignmentDetailManagement">
        <div className="AssignmentDetailManagement-wrapper">
          {getLoading ? (
            <div className="AssignmentDetailManagement-table flex items-center justify-center">
              <Loading />
            </div>
          ) : (
            <div className="AssignmentDetailManagement-table">
              <Breadcrumb options={dataBreadcrumb} />

              <div className="AssignmentDetailManagement-header">
                <Row gutter={[16, 16]} justify="space-between" align="middle" wrap={false}>
                  <Col>
                    <div className="AssignmentDetailManagement-title">{assignmentState?.name}</div>
                    <Row gutter={[8, 8]}>
                      <Col>
                        <Tag
                          iconName={EIconName.BrandRedux}
                          iconColor={assignmentStatus?.data?.color}
                          title={assignmentStatus?.label}
                          size="small"
                          type={assignmentStatus?.data?.tagType}
                        />
                      </Col>
                      <Col>
                        <Tag
                          type={ETagType.GENERAL}
                          title={assignmentType?.label}
                          iconName={assignmentType?.data?.iconName}
                          size="small"
                        />
                      </Col>
                      {assignmentArrange && (
                        <Col>
                          <Tag
                            type={ETagType.GENERAL}
                            title={assignmentArrange?.label}
                            iconName={assignmentArrange?.data?.iconName}
                            size="small"
                          />
                        </Col>
                      )}
                    </Row>
                  </Col>
                  <Col>
                    <Row gutter={[8, 8]} wrap={false}>
                      <Col>
                        <Button
                          title="Xem trước"
                          size="small"
                          iconName={EIconName.Eye}
                          iconColor={EIconColor.SHARK}
                          styleType={EButtonStyleType.OUTLINE_GEYSER}
                          onClick={(): void => {
                            if (!id) return;
                            window.open(Paths.AssignmentPreview(id), '_blank', 'noopener,noreferrer');
                          }}
                        />
                      </Col>
                      <Col>
                        <Button
                          title="Sửa"
                          size="small"
                          iconName={EIconName.Pencil}
                          iconColor={EIconColor.SHARK}
                          styleType={EButtonStyleType.OUTLINE_GEYSER}
                          onClick={(): void => handleOpenAssignmentFormModal(assignmentState)}
                        />
                      </Col>
                      <Col>
                        <Button
                          title="Xoá"
                          size="small"
                          iconName={EIconName.Trash}
                          iconColor={EIconColor.SHARK}
                          styleType={EButtonStyleType.OUTLINE_GEYSER}
                          onClick={(): void => handleOpenDeleteAssignmentModal(assignmentState)}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>

              <div className="AssignmentDetailManagement-questions-header flex items-center justify-between">
                <div className="AssignmentDetailManagement-subtitle" style={{ margin: 0 }}>
                  Câu hỏi ({questions.length || EEmpty.ZERO})
                </div>
                <Row gutter={[8, 8]}>
                  <Col>
                    <Button
                      title="Tạo câu hỏi mới"
                      size="small"
                      styleType={EButtonStyleType.OUTLINE_GEYSER}
                      iconName={EIconName.Plus}
                      iconColor={EIconColor.SHARK}
                      onClick={(): void => handleOpenQuestionFormModal()}
                    />
                  </Col>
                  <Col>
                    <Button
                      title="Thêm từ ngân hàng"
                      size="small"
                      styleType={EButtonStyleType.PRIMARY}
                      iconName={EIconName.Plus}
                      iconColor={EIconColor.WHITE}
                      onClick={handleOpenPickBankModal}
                    />
                  </Col>
                  <Col>
                    <Button
                      title="Thêm từ nhóm"
                      size="small"
                      styleType={EButtonStyleType.OUTLINE_GEYSER}
                      iconName={EIconName.UsersGroup}
                      iconColor={EIconColor.SHARK}
                      onClick={handleOpenPickGroupModal}
                    />
                  </Col>
                </Row>
              </div>

              {isEmpty ? (
                <Empty />
              ) : (
                <QuestionsSortable
                  data={questions}
                  dataAssignment={assignmentState}
                  onItemEdit={handleOpenQuestionFormModal}
                  onItemDelete={handleOpenDeleteQuestionModal}
                />
              )}
            </div>
          )}
        </div>
      </div>

      <ModalQuestionForm
        {...questionFormModalState}
        dataLesson={{ type: assignmentState?.type } as TLesson}
        dataAssignment={assignmentState}
        onClose={handleCloseQuestionFormModal}
        onSuccess={getAssignment}
      />
      <ModalDeleteQuestion
        {...deleteQuestionModalState}
        onClose={handleCloseDeleteQuestionModal}
        onSuccess={getAssignment}
      />
      <ModalAssignmentForm
        {...assignmentFormModalState}
        onClose={handleCloseAssignmentFormModal}
        onSuccess={getAssignment}
      />
      <ModalDeleteAssignment
        {...deleteAssignmentModalState}
        onClose={handleCloseDeleteAssignmentModal}
        onSuccess={(): void => {
          router.push(Paths.AssignmentsManagement);
        }}
      />
      <ModalPickBankQuestions
        {...pickBankModalState}
        assignment={assignmentState}
        onClose={handleClosePickBankModal}
        onSuccess={getAssignment}
      />
      <ModalPickQuestionGroup
        {...pickGroupModalState}
        assignment={assignmentState}
        onClose={handleClosePickGroupModal}
        onSuccess={getAssignment}
      />
    </>
  );
};

export default AssignmentDetailManagement;

AssignmentDetailManagement.getLayout = function (page: React.ReactNode) {
  return (
    <>
      <SEO />
      <Student>{page}</Student>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => ServerProtectedRoute(context);
