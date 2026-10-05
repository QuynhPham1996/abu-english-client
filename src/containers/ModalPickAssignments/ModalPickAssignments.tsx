import React, { useEffect, useState } from 'react';
import { Checkbox, Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '@/components/Modal';
import Input from '@/components/Input';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import Tag, { ETagType } from '@/components/Tag';
import Table from '@/components/Table';
import { showNotification } from '@/utils/functions';
import { TRootState } from '@/redux/reducers';
import {
  EAttachCourseAssignmentsAction,
  EAttachExerciseAssignmentsAction,
  EGetAssignmentsAction,
  attachCourseAssignmentsAction,
  attachExerciseAssignmentsAction,
  getAssignmentsAction,
} from '@/redux/actions';
import { EEmpty, ETypeNotification } from '@/common/enums';
import { TAssignment } from '@/common/models';
import { TGetAssignmentsResponse } from '@/services/api';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, dataLessonTypeOptions } from '@/common/constants';

import { TModalPickAssignmentsProps } from './ModalPickAssignments.types';

const ModalPickAssignments: React.FC<TModalPickAssignmentsProps> = ({
  visible,
  exerciseId,
  courseId,
  attachedSourceIds = [],
  attachedNames = [],
  onClose,
  onSuccess,
}) => {
  const dispatch = useDispatch();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const assignmentsState = useSelector(
    (state: TRootState) => state.assignmentReducer.getAssignmentsResponse,
  ) as TGetAssignmentsResponse | undefined;
  const getLoading = useSelector((state: TRootState) => state.loadingReducer[EGetAssignmentsAction.GET_ASSIGNMENTS]);
  const submitLoading = useSelector(
    (state: TRootState) =>
      state.loadingReducer[
        courseId
          ? EAttachCourseAssignmentsAction.ATTACH_COURSE_ASSIGNMENTS
          : EAttachExerciseAssignmentsAction.ATTACH_EXERCISE_ASSIGNMENTS
      ],
  );

  const takenNames = new Set(attachedNames.map((item) => item.trim().toLowerCase()));
  const isTaken = (item: TAssignment): boolean =>
    attachedSourceIds.includes(item.id) || takenNames.has(item.name?.trim().toLowerCase());
  const sourceAssignments = (assignmentsState?.data || []) as TAssignment[];
  const assignments = sourceAssignments.filter((item) => !isTaken(item));
  const total = Math.max(0, (assignmentsState?.paginate?.total || 0) - (sourceAssignments.length - assignments.length));

  const toggleSelect = (item: TAssignment): void => {
    setSelectedIds((current) =>
      current.includes(item.id) ? current.filter((id) => id !== item.id) : [...current, item.id],
    );
  };

  const handleSubmit = (): void => {
    const targetId = courseId || exerciseId;
    if (!targetId || selectedIds.length === 0) return;

    const request = courseId ? attachCourseAssignmentsAction.request : attachExerciseAssignmentsAction.request;
    const place = courseId ? 'khoá học' : 'bài học';

    dispatch(
      request({ paths: { id: targetId }, body: { assignmentIds: selectedIds } }, (response) => {
        const attached = response?.attached ?? 0;
        const skipped = response?.skipped ?? 0;
        if (attached > 0) {
          showNotification(
            ETypeNotification.SUCCESS,
            skipped > 0
              ? `Đã gắn ${attached} bài tập. ${skipped} bài đã có trên ${place}.`
              : `Đã gắn ${attached} bài tập vào ${place}.`,
          );
        } else {
          showNotification(ETypeNotification.WARNING, `Các bài tập đã được gắn trên ${place} này.`);
        }
        onSuccess?.();
        onClose?.();
      }),
    );
  };

  useEffect(() => {
    if (visible) {
      setSelectedIds([]);
      setSearch('');
      setPage(DEFAULT_PAGE);
      setPageSize(DEFAULT_PAGE_SIZE);
    }
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    dispatch(
      getAssignmentsAction.request({
        params: {
          page,
          pageSize,
          search: search || undefined,
        },
      }),
    );
  }, [visible, search, page, pageSize, dispatch]);

  return (
    <Modal
      title="Chọn bài tập"
      visible={visible}
      onClose={onClose}
      onSubmit={handleSubmit}
      width={880}
      showActions
      loading={submitLoading}
      confirmButton={{ title: `Gắn bài tập (${selectedIds.length})`, disabled: selectedIds.length === 0 }}
    >
      <Table
        loading={getLoading}
        dataSources={assignments}
        page={assignmentsState?.paginate?.page || page}
        pageSize={assignmentsState?.paginate?.pageSize || pageSize}
        total={total}
        onPaginationChange={(nextPage, nextPageSize): void => {
          setPage(nextPage);
          setPageSize(nextPageSize);
        }}
        onRow={(record: TAssignment) => ({
          onClick: (): void => toggleSelect(record),
        })}
        header={
          <Row gutter={[16, 16]} justify="space-between" align="middle">
            <Col flex="auto">
              <Input
                placeholder="Tìm kiếm bài tập"
                suffix={<Icon name={EIconName.Search} color={EIconColor.SHARK} />}
                onSearch={(keyword): void => {
                  setSearch(keyword || '');
                  setPage(DEFAULT_PAGE);
                }}
              />
            </Col>
          </Row>
        }
        columns={[
          {
            key: 'select',
            dataIndex: 'select',
            title: '',
            width: 48,
            render: (_: string, record: TAssignment): React.ReactElement => (
              <div onClick={(event): void => event.stopPropagation()}>
                <Checkbox checked={selectedIds.includes(record.id)} onChange={(): void => toggleSelect(record)} />
              </div>
            ),
          },
          {
            key: 'name',
            dataIndex: 'name',
            title: 'Bài tập',
            className: 'limit-width-large',
          },
          {
            key: 'type',
            dataIndex: 'type',
            title: 'Loại',
            render: (_: string, record: TAssignment): React.ReactElement => {
              const lessonType = dataLessonTypeOptions.find((option) => option.value === record.type);
              return <Tag type={ETagType.GENERAL} title={lessonType?.label} size="small" />;
            },
          },
          {
            key: 'questions',
            dataIndex: 'questions',
            title: 'Số câu hỏi',
            render: (_: string, record: TAssignment): React.ReactElement => (
              <>{assignmentsState?.totalQuestions?.[record.id] || EEmpty.ZERO}</>
            ),
          },
        ]}
      />
    </Modal>
  );
};

export default ModalPickAssignments;
