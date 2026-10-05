import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '@/components/Modal';
import Input from '@/components/Input';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import Empty from '@/components/Empty';
import Loading from '@/components/Loading';
import Button, { EButtonStyleType } from '@/components/Button';
import { showNotification } from '@/utils/functions';
import { TRootState } from '@/redux/reducers';
import {
  EAddAssignmentGroupAction,
  EAddLessonGroupAction,
  EGetQuestionGroupsAction,
  addAssignmentGroupAction,
  addLessonGroupAction,
  getQuestionGroupsAction,
} from '@/redux/actions';
import { dataLessonTypeOptions } from '@/common/constants';
import { EEmpty, ELessonStatus, ETypeNotification } from '@/common/enums';
import { TQuestionGroup } from '@/common/models';
import { TGetQuestionGroupsResponse } from '@/services/api';

import { TModalPickQuestionGroupProps } from './ModalPickQuestionGroup.types';

const ModalPickQuestionGroup: React.FC<TModalPickQuestionGroupProps> = ({
  visible,
  assignment,
  lesson,
  onClose,
  onSuccess,
}) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const target = lesson || assignment;

  const groupsState = useSelector(
    (state: TRootState) => state.questionGroupReducer.getQuestionGroupsResponse,
  ) as TGetQuestionGroupsResponse | undefined;
  const getLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EGetQuestionGroupsAction.GET_QUESTION_GROUPS],
  );
  const submitLoading = useSelector(
    (state: TRootState) =>
      state.loadingReducer[lesson ? EAddLessonGroupAction.ADD_LESSON_GROUP : EAddAssignmentGroupAction.ADD_ASSIGNMENT_GROUP],
  );

  const typeLabel = dataLessonTypeOptions.find((option) => option.value === target?.type)?.label?.toLowerCase();
  const groups = ((groupsState?.data || []) as TQuestionGroup[]).filter((item) => {
    if (!target?.type) return true;
    return (groupsState?.totalQuestions?.[item.id] || 0) > 0;
  });

  const handlePick = (groupId: string): void => {
    if (!target?.id) return;

    const request = lesson ? addLessonGroupAction.request : addAssignmentGroupAction.request;

    dispatch(
      request({ paths: { id: target.id }, body: { groupId } }, (response) => {
        const copied = (response as { copied?: number } | undefined)?.copied;
        if (!copied) {
          showNotification(ETypeNotification.WARNING, 'Các câu hỏi trong nhóm đã có trong bài tập.');
          onClose?.();
          return;
        }
        showNotification(ETypeNotification.SUCCESS, 'Đã thêm câu hỏi từ nhóm vào bài tập.');
        onSuccess?.();
        onClose?.();
      }),
    );
  };

  useEffect(() => {
    if (visible) {
      dispatch(
        getQuestionGroupsAction.request({
          params: {
            page: 1,
            pageSize: 50,
            status: ELessonStatus.PUBLIC,
            search: search || undefined,
            type: target?.type,
          },
        }),
      );
    }
  }, [visible, search, target?.type, dispatch]);

  return (
    <Modal
      title={`Thêm câu hỏi ${typeLabel || ''} từ nhóm`.replace(/\s+/g, ' ').trim()}
      visible={visible}
      onClose={onClose}
      width={560}
      loading={submitLoading}
    >
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Input
            placeholder="Tìm kiếm nhóm"
            suffix={<Icon name={EIconName.Search} color={EIconColor.SHARK} />}
            onSearch={(keyword): void => setSearch(keyword || '')}
          />
        </Col>
        <Col span={24}>
          {getLoading ? (
            <div className="flex items-center justify-center">
              <Loading />
            </div>
          ) : groups.length === 0 ? (
            <Empty />
          ) : (
            <div className="QuestionPickerList">
              {groups.map((item) => (
              <Row
                key={item.id}
                className="QuestionPickerList-item"
                gutter={[8, 8]}
                align="middle"
                justify="space-between"
                wrap={false}
              >
                <Col flex={1}>
                  <div className="QuestionPickerList-title ellipsis-1">{item.name}</div>
                  <div className="QuestionPickerList-meta">
                    {groupsState?.totalQuestions?.[item.id] || EEmpty.ZERO} câu hỏi
                  </div>
                </Col>
                <Col>
                  <Button
                    title="Thêm nhóm"
                    size="small"
                    styleType={EButtonStyleType.PRIMARY}
                    onClick={(): void => handlePick(item.id)}
                  />
                </Col>
              </Row>
            ))}
            </div>
          )}
        </Col>
      </Row>
    </Modal>
  );
};

export default ModalPickQuestionGroup;
