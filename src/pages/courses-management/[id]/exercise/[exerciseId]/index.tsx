import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Col, Row } from 'antd';
import moment from 'moment';

import SEO from '@/components/SEO';
import Student from '@/layouts/Student';
import { Paths } from '@/routers/constants';
import Button, { EButtonStyleType } from '@/components/Button';
import DropdownMenu from '@/components/DropdownMenu';
import Icon, { EIconName, EIconColor } from '@/components/Icon';
import Tag, { ETagType } from '@/components/Tag';
import Breadcrumb from '@/components/Breadcrumb';
import ExercisesManagementCollapse from '@/containers/ExercisesManagementCollapse';
import ModalDeleteQuestion from '@/containers/ModalDeleteQuestion';
import { useModalState, useWarnIfUnsavedChanges } from '@/utils/hooks';
import ModalQuestionForm from '@/containers/ModalQuestionForm';
import ModalGroupQuestionForm from '@/containers/ModalGroupQuestionForm';
import ModalDeleteGroupQuestion from '@/containers/ModalDeleteGroupQuestion';
import ModalPickAssignments from '@/containers/ModalPickAssignments';
import ModalPickBankQuestions from '@/containers/ModalPickBankQuestions';
import ModalPickQuestionGroup from '@/containers/ModalPickQuestionGroup';
import {
  EGetExerciseAction,
  EGetLessonsFromExerciseAction,
  getExerciseAction,
  getLessonsFromExerciseAction,
} from '@/redux/actions';
import { TRootState } from '@/redux/reducers';
import Loading from '@/components/Loading';
import ModalExerciseForm from '@/containers/ModalExerciseForm';
import ModalDeleteExercise from '@/containers/ModalDeleteExercise';
import { dataExerciseStatusOptions } from '@/common/constants';
import Empty from '@/components/Empty';
import { EEmpty } from '@/common/enums';
import { getFullPath, parseLoadingAction } from '@/utils/functions';
import ModalUploadExerciseVideo from '@/containers/ModalUploadExerciseVideo';
import VideoCourse from '@/components/VideoCourse';
import { ServerProtectedRoute } from '@/utils/server-side';
import { GetServerSideProps } from 'next';

const CourseDetailExerciseManagement = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const courseId = router.query?.id as string;
  const id = router.query?.exerciseId as string;

  const exerciseState = useSelector((state: TRootState) => state.exerciseReducer.getExerciseResponse)?.data;
  const getExerciseLoading = parseLoadingAction(
    useSelector((state: TRootState) => state.loadingReducer[EGetExerciseAction.GET_EXERCISE]),
  );
  const exerciseStatus = dataExerciseStatusOptions.find((option) => option.value === exerciseState?.status);

  const lessonsTotalState = useSelector((state: TRootState) => state.lessonReducer.getLessonsFromExerciseResponse)
    ?.totalLessons;
  const questionsTotalState = useSelector((state: TRootState) => state.lessonReducer.getLessonsFromExerciseResponse)
    ?.totalQuestions;

  const lessonState = useSelector((state: TRootState) => state.lessonReducer.getLessonsFromExerciseResponse)?.data;
  const getLessonsLoading = parseLoadingAction(
    useSelector((state: TRootState) => state.loadingReducer[EGetLessonsFromExerciseAction.GET_LESSONS_FROM_EXERCISE]),
  );
  const isEmpty = lessonState?.length === 0;

  const [deleteQuestionModalState, handleOpenDeleteQuestionModal, handleCloseDeleteQuestionModal] = useModalState();
  const [questionFormModalState, handleOpenQuestionFormModal, handleCloseQuestionFormModal] = useModalState();
  const [deleteGroupQuestionModalState, handleOpenDeleteGroupQuestionModal, handleCloseDeleteGroupQuestionModal] =
    useModalState();
  const [groupQuestionFormModalState, handleOpenGroupQuestionFormModal, handleCloseGroupQuestionFormModal] =
    useModalState();
  const [pickAssignmentsModalState, handleOpenPickAssignmentsModal, handleClosePickAssignmentsModal] = useModalState();
  const [pickBankModalState, handleOpenPickBankModal, handleClosePickBankModal] = useModalState();
  const [pickGroupModalState, handleOpenPickGroupModal, handleClosePickGroupModal] = useModalState();
  const [deleteExerciseModalState, handleOpenDeleteExerciseModal, handleCloseDeleteExerciseModal] = useModalState();
  const [exerciseFormModalState, handleOpenExerciseFormModal, handleCloseExerciseFormModal] = useModalState();
  const [uploadExerciseVideoModalState, handleOpenUploadExerciseVideoModal, handleCloseUploadExerciseVideoModal] =
    useModalState();

  const dataBreadcrumb = [
    {
      key: 'courses',
      title: 'Khoá học',
      href: Paths.CoursesManagement,
    },
    {
      key: 'course-detail',
      title: 'Chi tiết khoá học',
      href: Paths.CourseDetailManagement(courseId),
    },
    {
      key: 'exercise-detail',
      title: 'Chi tiết bài học',
      href: Paths.CourseDetailExerciseManagement(courseId, id),
    },
  ];

  const dataCourseDetailExerciseManagementMenu = [
    {
      value: 'edit',
      label: 'Sửa bài học',
      icon: EIconName.Pencil,
      onClick: (): void => {
        handleOpenExerciseFormModal(exerciseState);
      },
    },
    {
      value: 'delete',
      label: 'Xoá bài học',
      danger: true,
      icon: EIconName.Trash,
      onClick: (): void => {
        handleOpenDeleteExerciseModal(exerciseState);
      },
    },
  ];

  useWarnIfUnsavedChanges(!uploadExerciseVideoModalState?.visible, () => {
    return confirm(
      'Bạn có chắc chắn muốn thoát khỏi trang này không? Quá trình tải video lên sẽ không được lưu lại.',
    );
  });

  const getExercise = useCallback(() => {
    if (id && courseId) dispatch(getExerciseAction.request({ paths: { id, courseId } }));
  }, [id, courseId, dispatch]);

  const getLessons = useCallback(() => {
    if (id) dispatch(getLessonsFromExerciseAction.request({ paths: { exerciseid: id } }));
  }, [id, dispatch]);

  useEffect(() => {
    getExercise();
  }, [getExercise]);

  useEffect(() => {
    getLessons();
  }, [getLessons]);

  return (
    <>
      <div className="CourseDetailExerciseManagement">
        <div className="CourseDetailExerciseManagement-wrapper">
          {getExerciseLoading ? (
            <div className="CourseDetailExerciseManagement-table flex items-center justify-center">
              <Loading />
            </div>
          ) : (
            <div className="CourseDetailExerciseManagement-table">
              <Breadcrumb options={dataBreadcrumb} />

              <Row gutter={[32, 24]}>
                <Col span={24} lg={{ span: 16 }}>
                  <div className="CourseDetailExerciseManagement-header">
                    <Row gutter={[16, 16]} justify="space-between" wrap={false}>
                      <Col>
                        <div className="CourseDetailExerciseManagement-title">{exerciseState?.name}</div>
                        <Tag
                          iconName={EIconName.BrandRedux}
                          iconColor={exerciseStatus?.data?.color}
                          title={exerciseStatus?.label}
                          size="small"
                          type={exerciseStatus?.data?.tagType}
                        />
                      </Col>
                      <Col>
                        <Row gutter={[8, 8]}>
                          <Col>
                            <DropdownMenu options={dataCourseDetailExerciseManagementMenu} placement="bottomRight">
                              <Button
                                iconName={EIconName.Dots}
                                iconColor={EIconColor.SHARK}
                                size="small"
                                styleType={EButtonStyleType.OUTLINE_GEYSER}
                              />
                            </DropdownMenu>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </div>

                  <div className="CourseDetailExerciseManagement-body">
                    <div className="CourseDetailExerciseManagement-exercises">
                      <div
                        className="CourseDetailExerciseManagement-exercises-header flex items-center justify-between"
                        style={{ marginBottom: '2.4rem' }}
                      >
                        <div className="CourseDetailExerciseManagement-exercises-header-item">
                          <div className="CourseDetailExerciseManagement-subtitle" style={{ margin: 0 }}>
                            Bài tập ({lessonState?.length || EEmpty.ZERO})
                          </div>
                        </div>
                        <div className="CourseDetailExerciseManagement-exercises-header-item">
                          <Row gutter={[8, 8]}>
                            <Col>
                              <Button
                                title="Tạo bài tập"
                                styleType={EButtonStyleType.OUTLINE_GEYSER}
                                iconName={EIconName.Plus}
                                iconColor={EIconColor.SHARK}
                                onClick={handleOpenGroupQuestionFormModal}
                              />
                            </Col>
                            <Col>
                              <Button
                                title="Chọn từ thư viện"
                                styleType={EButtonStyleType.PRIMARY}
                                iconName={EIconName.ClipboardText}
                                iconColor={EIconColor.WHITE}
                                onClick={handleOpenPickAssignmentsModal}
                              />
                            </Col>
                          </Row>
                        </div>
                      </div>

                      <div className="CourseDetailExerciseManagement-exercises-body">
                        {getLessonsLoading && (
                          <div className="CourseDetailExerciseManagement-exercises-body-loading flex items-center justify-center">
                            <Loading />
                          </div>
                        )}
                        {isEmpty ? (
                          <Empty />
                        ) : (
                          <ExercisesManagementCollapse
                            data={lessonState}
                            onGroupItemEdit={handleOpenGroupQuestionFormModal}
                            onGroupItemDelete={handleOpenDeleteGroupQuestionModal}
                            onItemDelete={handleOpenDeleteQuestionModal}
                            onItemEdit={handleOpenQuestionFormModal}
                            onItemCreate={handleOpenQuestionFormModal}
                            onPickBankQuestions={handleOpenPickBankModal}
                            onPickQuestionGroup={handleOpenPickGroupModal}
                            onPreview={(lesson): void => {
                              if (!lesson?.id) return;
                              window.open(Paths.LessonPreview(courseId, id, lesson.id), '_blank', 'noopener,noreferrer');
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </Col>
                <Col span={24} lg={{ span: 8 }}>
                  <div className="CourseDetailExerciseManagement-card">
                    <div className="CourseDetailExerciseManagement-subtitle">Thông tin bài học</div>
                    <div className="CourseDetailExerciseManagement-description pre-line">
                      {exerciseState?.description}
                    </div>
                    <div className="CourseDetailExerciseManagement-info">
                      <Row gutter={[8, 8]} align="middle">
                        <Col>
                          <Tag
                            size="small"
                            iconName={EIconName.NoteBook}
                            iconColor={EIconColor.SHARK}
                            type={ETagType.GENERAL}
                            title={`${lessonsTotalState || EEmpty.ZERO} bài tập`}
                          />
                        </Col>
                        <Col>
                          <Tag
                            size="small"
                            iconName={EIconName.Help}
                            iconColor={EIconColor.SHARK}
                            type={ETagType.GENERAL}
                            title={`${questionsTotalState || EEmpty.ZERO} câu hỏi`}
                          />
                        </Col>
                      </Row>
                    </div>

                    <div className="CourseDetailExerciseManagement-description" style={{ fontSize: '1.2rem' }}>
                      Lần cuối cập nhật: <strong>{moment(exerciseState?.updatedAt).fromNow()}</strong>
                    </div>
                  </div>

                  {exerciseState?.videoUrl ? (
                    <div className="CourseDetailExerciseManagement-card">
                      <div className="CourseDetailExerciseManagement-subtitle flex items-center justify-between">
                        Video bài học
                        <Button
                          title="Thay đổi video"
                          styleType={EButtonStyleType.PRIMARY}
                          size="small"
                          iconName={EIconName.Movie}
                          iconColor={EIconColor.WHITE}
                          onClick={(): void => handleOpenUploadExerciseVideoModal(exerciseState)}
                        />
                      </div>
                      <VideoCourse title={exerciseState?.name} src={getFullPath(exerciseState?.videoUrl)} />
                    </div>
                  ) : (
                    <div
                      className="CourseDetailExerciseManagement-upload"
                      onClick={(): void => handleOpenUploadExerciseVideoModal(exerciseState)}
                    >
                      <div className="CourseDetailExerciseManagement-upload-video"></div>
                      <div className="CourseDetailExerciseManagement-upload-placeholder text-center flex items-center justify-center flex-col">
                        <div className="CourseDetailExerciseManagement-upload-placeholder-icon">
                          <Icon name={EIconName.Movie} color={EIconColor.PALE_SKY} />
                        </div>
                        Bài học chưa có video.
                        <br />
                        Vui lòng upload video bài học tại đây.
                      </div>
                    </div>
                  )}
                </Col>
              </Row>
            </div>
          )}
        </div>
      </div>

      <ModalPickBankQuestions
        visible={pickBankModalState.visible}
        lesson={pickBankModalState.data}
        onClose={handleClosePickBankModal}
        onSuccess={getLessons}
      />
      <ModalPickQuestionGroup
        visible={pickGroupModalState.visible}
        lesson={pickGroupModalState.data}
        onClose={handleClosePickGroupModal}
        onSuccess={getLessons}
      />
      <ModalPickAssignments
        {...pickAssignmentsModalState}
        exerciseId={id}
        attachedSourceIds={(lessonState || [])
          .map((item) => item.sourceAssignment)
          .filter((item): item is string => Boolean(item))}
        onClose={handleClosePickAssignmentsModal}
        onSuccess={getLessons}
      />
      <ModalQuestionForm {...questionFormModalState} onClose={handleCloseQuestionFormModal} onSuccess={getLessons} />
      <ModalGroupQuestionForm
        {...groupQuestionFormModalState}
        dataExercise={exerciseState}
        onClose={handleCloseGroupQuestionFormModal}
        onSuccess={getLessons}
      />
      <ModalDeleteQuestion
        {...deleteQuestionModalState}
        onClose={handleCloseDeleteQuestionModal}
        onSuccess={getLessons}
      />
      <ModalDeleteGroupQuestion
        {...deleteGroupQuestionModalState}
        onClose={handleCloseDeleteGroupQuestionModal}
        onSuccess={getLessons}
      />

      <ModalExerciseForm
        {...exerciseFormModalState}
        dataCourse={exerciseState?.course}
        onClose={handleCloseExerciseFormModal}
        onSuccess={getExercise}
      />
      <ModalDeleteExercise
        {...deleteExerciseModalState}
        onClose={handleCloseDeleteExerciseModal}
        onSuccess={(): void => {
          router.push(Paths.CourseDetailManagement(exerciseState?.course?.id));
        }}
      />

      <ModalUploadExerciseVideo
        {...uploadExerciseVideoModalState}
        onClose={handleCloseUploadExerciseVideoModal}
        onSuccess={getExercise}
      />
    </>
  );
};

export default CourseDetailExerciseManagement;

CourseDetailExerciseManagement.getLayout = function (page: React.ReactNode) {
  return (
    <>
      <SEO />
      <Student>{page}</Student>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => ServerProtectedRoute(context);
