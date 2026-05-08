import React, { useCallback, useEffect } from 'react';
import { Col, Row } from 'antd';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import moment from 'moment';

import Student from '@/layouts/Student';
import Breadcrumb from '@/components/Breadcrumb';
import { Paths } from '@/routers/constants';
import Button, { EButtonStyleType } from '@/components/Button';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import Tag, { ETagType } from '@/components/Tag';
import DropdownMenu from '@/components/DropdownMenu';
import SEO from '@/components/SEO';
import Avatar from '@/components/Avatar';
import Table from '@/components/Table';
import Tooltip from '@/components/Tooltip';
import ModalDeleteExercise from '@/containers/ModalDeleteExercise';
import { useModalState, usePaginationTool } from '@/utils/hooks';
import ModalExerciseForm from '@/containers/ModalExerciseForm';
import {
  EGetCourseAction,
  EGetExercisesFromCourseAction,
  getCourseAction,
  getExercisesFromCourseAction,
} from '@/redux/actions';
import { TRootState } from '@/redux/reducers';
import { dataCourseLevelOptions, dataCourseStatusOptions, dataExerciseStatusOptions } from '@/common/constants';
import {
  formatCurrency,
  formatVideoDuration,
  getFileNameVideo,
  getFullPath,
  parseLoadingAction,
} from '@/utils/functions';
import ModalCourseForm from '@/containers/ModalCourseForm';
import ModalDeleteCourse from '@/containers/ModalDeleteCourse';
import Loading from '@/components/Loading';
import { EEmpty } from '@/common/enums';
import { TExercise } from '@/common/models';
import { TGetExercisesFromCourseResponse } from '@/services/api';
import { ServerProtectedRoute } from '@/utils/server-side';
import { GetServerSideProps } from 'next';

const CourseDetailManagement = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const id = router.query?.id as string;

  const getCourseLoading = parseLoadingAction(
    useSelector((state: TRootState) => state.loadingReducer[EGetCourseAction.GET_COURSE]),
  );
  const courseState = useSelector((state: TRootState) => state.courseReducer.getCourseResponse)?.data;
  const courseStatus = dataCourseStatusOptions.find((option) => option.value === courseState?.status);
  const courseLevel = dataCourseLevelOptions.find((option) => option.value === courseState?.level);

  const [deleteCourseModalState, handleOpenDeleteCourseModal, handleCloseDeleteCourseModal] = useModalState();
  const [courseFormModalState, handleOpenCourseFormModal, handleCloseCourseFormModal] = useModalState();
  const [deleteExerciseModalState, handleOpenDeleteExerciseModal, handleCloseDeleteExerciseModal] = useModalState();
  const [exerciseFormModalState, handleOpenExerciseFormModal, handleCloseExerciseFormModal] = useModalState();

  const {
    paramsRequest: getExercisesParamsRequest,
    loading: getExercisesLoading,
    state: exercisesState,
    getData: getExercises,
    handlePaginationChange: handlePaginationExercisesChange,
  } = usePaginationTool({
    availableToCall: Boolean(id),
    materials: { paths: { courseId: id } },
    action: getExercisesFromCourseAction,
    reducer: 'exerciseReducer',
    response: 'getExercisesFromCourseResponse',
    loadingAction: EGetExercisesFromCourseAction.GET_EXERCISES_FROM_COURSE,
  });

  const dataBreadcrumb = [
    {
      key: 'courses',
      title: 'Khoá học',
      href: Paths.CoursesManagement,
    },
    {
      key: 'course-detail',
      title: 'Chi tiết khoá học',
      href: Paths.CourseDetailManagement(id),
    },
  ];

  const dataCourseDetailManagementMenu = [
    {
      value: 'edit',
      label: 'Sửa khoá học',
      icon: EIconName.Pencil,
      onClick: (): void => {
        handleOpenCourseFormModal(courseState);
      },
    },
    {
      value: 'delete',
      label: 'Xoá khoá học',
      danger: true,
      icon: EIconName.Trash,
      onClick: (): void => {
        handleOpenDeleteCourseModal(courseState);
      },
    },
  ];

  const columns = [
    {
      key: 'index',
      dataIndex: 'index',
      title: 'STT',
      // sorter: true,
      render: (_: string, __: any, index: number): React.ReactElement => <>{index + 1}</>,
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Bài học',
      className: 'limit-width-large',
      sorter: true,
      keySort: 'name',
      render: (_: string, record: TExercise): React.ReactElement => (
        <div className="Table-info">
          <div className="Table-info-title ellipsis-1 flex items-center">{record?.name}</div>
          <div className="Table-info-description small ellipsis-1">{record?.description}</div>
          {record.videoUrl && (
            <div
              className="Table-info-description small flex items-center"
              style={{ columnGap: '.2rem', marginTop: '.4rem', color: EIconColor.ALIZARIN_CRIMSON }}
            >
              <Icon
                style={{ width: '2rem', height: '2rem' }}
                name={EIconName.Movie}
                color={EIconColor.ALIZARIN_CRIMSON}
              />
              <span className="ellipsis-1">{getFileNameVideo(record?.videoUrl)}</span>
            </div>
          )}
        </div>
      ),
    },
    {
      key: 'duration',
      dataIndex: 'duration',
      title: 'Thời lượng',
      render: (_: string, record: TExercise): React.ReactElement =>
        record?.videoDuration ? (
          <Tag
            iconName={EIconName.Alarm}
            iconColor={EIconColor.SHARK}
            type={ETagType.GENERAL}
            title={formatVideoDuration(record?.videoDuration)}
            size="small"
          />
        ) : (
          <>{EEmpty.DASH}</>
        ),
    },
    {
      key: 'countLessons',
      dataIndex: 'countLessons',
      title: 'Số bài tập',
      render: (_: string, record: TExercise): React.ReactElement => (
        <>{(exercisesState as TGetExercisesFromCourseResponse)?.totalLessons?.[record.id] || EEmpty.ZERO}</>
      ),
    },
    {
      key: 'countQuestions',
      dataIndex: 'countQuestions',
      title: 'Số câu hỏi',
      render: (_: string, record: TExercise): React.ReactElement => (
        <>{(exercisesState as TGetExercisesFromCourseResponse)?.totalQuestions?.[record.id] || EEmpty.ZERO}</>
      ),
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: 'Trạng thái',
      sorter: true,
      keySort: 'status',
      render: (_: string, record: TExercise): React.ReactElement => {
        const status = dataExerciseStatusOptions.find((option) => option.value === record?.status);

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
      render: (_: string, record: TExercise): React.ReactElement => (
        <div onClick={(e): void => e.stopPropagation()}>
          <Row gutter={[8, 8]} wrap={false}>
            <Col>
              <Tooltip title="Xem chi tiết">
                <Button
                  iconName={EIconName.Eye}
                  iconColor={EIconColor.SHARK}
                  size="small"
                  styleType={EButtonStyleType.OUTLINE_GEYSER}
                  link={Paths.CourseDetailExerciseManagement(id, record?.id)}
                />
              </Tooltip>
            </Col>
            <Col>
              <Tooltip title="Sửa bài học">
                <Button
                  iconName={EIconName.Pencil}
                  iconColor={EIconColor.SHARK}
                  size="small"
                  styleType={EButtonStyleType.OUTLINE_GEYSER}
                  onClick={(): void => handleOpenExerciseFormModal(record)}
                />
              </Tooltip>
            </Col>
            <Col>
              <Tooltip title="Xoá bài học">
                <Button
                  iconName={EIconName.Trash}
                  iconColor={EIconColor.SHARK}
                  size="small"
                  styleType={EButtonStyleType.OUTLINE_GEYSER}
                  onClick={(): void => {
                    handleOpenDeleteExerciseModal(record);
                  }}
                />
              </Tooltip>
            </Col>
          </Row>
        </div>
      ),
    },
  ];

  const getCourse = useCallback(() => {
    if (id) dispatch(getCourseAction.request({ paths: { id } }));
  }, [dispatch, id]);

  useEffect(() => {
    getCourse();
  }, [getCourse]);

  return (
    <>
      <div className="CourseDetailManagement">
        <div className="CourseDetailManagement-wrapper">
          {!courseState || getCourseLoading ? (
            <div className="CourseDetailManagement-table flex items-center justify-center">
              <Loading />
            </div>
          ) : (
            <div className="CourseDetailManagement-table">
              <Breadcrumb options={dataBreadcrumb} />

              <Row gutter={[32, 32]}>
                <Col span={24} lg={{ span: 16 }}>
                  <div className="CourseDetailManagement-header">
                    <Row gutter={[16, 16]} justify="space-between" wrap={false}>
                      <Col>
                        <div className="CourseDetailManagement-title">{courseState?.name}</div>
                        <Tag
                          iconName={EIconName.BrandRedux}
                          iconColor={courseStatus?.data?.color}
                          title={courseStatus?.label}
                          size="small"
                          type={courseStatus?.data?.tagType}
                        />
                      </Col>
                      <Col>
                        <Row gutter={[8, 8]}>
                          <Col>
                            <DropdownMenu options={dataCourseDetailManagementMenu} placement="bottomRight">
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

                  <div className="CourseDetailManagement-body">
                    <Table
                      header={
                        <Row gutter={[16, 16]} justify="space-between" align="middle">
                          <Col>
                            <Row gutter={[16, 16]} align="middle">
                              <Col>
                                <div className="CourseDetailManagement-subtitle" style={{ marginBottom: 0 }}>
                                  Bài Học ({exercisesState?.paginate?.total || EEmpty.ZERO})
                                </div>
                              </Col>
                            </Row>
                          </Col>

                          <Col>
                            <Row gutter={[16, 16]}>
                              <Col>
                                <Button
                                  title="Tạo mới Bài học"
                                  iconName={EIconName.Plus}
                                  iconColor={EIconColor.WHITE}
                                  styleType={EButtonStyleType.PRIMARY}
                                  onClick={handleOpenExerciseFormModal}
                                />
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                      }
                      columns={columns}
                      dataSources={exercisesState?.data}
                      page={getExercisesParamsRequest?.page}
                      pageSize={getExercisesParamsRequest?.pageSize}
                      total={exercisesState?.paginate?.total}
                      loading={getExercisesLoading}
                      onPaginationChange={handlePaginationExercisesChange}
                    />
                  </div>
                </Col>
                <Col span={24} lg={{ span: 8 }}>
                  <div className="CourseDetailManagement-card">
                    <div className="CourseDetailManagement-subtitle">Thông tin khoá học</div>
                    {courseState?.image && (
                      <div className="CourseDetailManagement-image">
                        <Image src={getFullPath(courseState?.image) || ''} alt="" fill />
                      </div>
                    )}

                    <div className="CourseDetailManagement-description">{courseState?.description}</div>

                    <div className="CourseDetailManagement-info">
                      <Row gutter={[8, 8]} align="middle">
                        <Col>
                          <Tag
                            iconName={EIconName.AntennaBars}
                            iconColor={courseLevel?.data?.color}
                            title={courseLevel?.label}
                            size="small"
                            type={courseLevel?.data?.tagType}
                          />
                        </Col>
                        <Col>•</Col>
                        <Col>
                          <Tag
                            size="small"
                            iconName={EIconName.NoteBook}
                            iconColor={EIconColor.SHARK}
                            type={ETagType.GENERAL}
                            title={`${
                              (exercisesState as TGetExercisesFromCourseResponse)?.totalExercises || EEmpty.ZERO
                            } bài học`}
                          />
                        </Col>
                        {!!(exercisesState as TGetExercisesFromCourseResponse)?.totalDurations && (
                          <>
                            <Col>•</Col>
                            <Col>
                              <Tag
                                size="small"
                                iconName={EIconName.Alarm}
                                iconColor={EIconColor.SHARK}
                                type={ETagType.GENERAL}
                                title={formatVideoDuration(
                                  (exercisesState as TGetExercisesFromCourseResponse)?.totalDurations,
                                )}
                              />
                            </Col>
                          </>
                        )}
                      </Row>
                    </div>
                    <div className="CourseDetailManagement-price">
                      {courseState?.retailPrice && (
                        <div className="CourseDetailManagement-subtitle">
                          Giá niêm yết: <del>{formatCurrency(courseState?.retailPrice, true)}</del>
                        </div>
                      )}

                      <div className="CourseDetailManagement-title">
                        Giá bán: {formatCurrency(courseState?.sellingPrice, true)}
                      </div>
                    </div>

                    <div className="CourseDetailManagement-description" style={{ fontSize: '1.2rem' }}>
                      Lần cuối cập nhật: <strong>{moment(courseState?.updatedAt).fromNow()}</strong>
                    </div>
                  </div>

                  {courseState?.manager && (
                    <div className="CourseDetailManagement-card">
                      <div className="CourseDetailManagement-subtitle">Giảng viên</div>
                      <div className="CourseDetailManagement-manager">
                        <div className="CourseDetailManagement-manager-item">
                          <Row gutter={[8, 8]} align="middle">
                            <Col>
                              <Avatar
                                size={40}
                                textSize="small"
                                name={courseState?.manager?.name}
                                image={getFullPath(courseState?.manager?.avatar)}
                              />
                            </Col>
                            <Col>
                              <div className="CourseDetailManagement-manager-item-info">
                                <div className="CourseDetailManagement-manager-item-info-title ellipsis-1">
                                  {courseState?.manager?.name}
                                </div>
                                <div className="CourseDetailManagement-manager-item-info-description small ellipsis-1">
                                  {courseState?.manager?.username}
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    </div>
                  )}
                </Col>
              </Row>
            </div>
          )}
        </div>
      </div>

      <ModalCourseForm {...courseFormModalState} onClose={handleCloseCourseFormModal} onSuccess={getCourse} />
      <ModalDeleteCourse
        {...deleteCourseModalState}
        onClose={handleCloseDeleteCourseModal}
        onSuccess={(): void => {
          router.push(Paths.CoursesManagement);
        }}
      />

      <ModalExerciseForm
        {...exerciseFormModalState}
        dataCourse={courseState}
        onClose={handleCloseExerciseFormModal}
        onSuccess={getExercises}
      />
      <ModalDeleteExercise
        {...deleteExerciseModalState}
        onClose={handleCloseDeleteExerciseModal}
        onSuccess={getExercises}
      />
    </>
  );
};

export default CourseDetailManagement;

CourseDetailManagement.getLayout = function (page: React.ReactNode) {
  return (
    <>
      <SEO />
      <Student>{page}</Student>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => ServerProtectedRoute(context);
