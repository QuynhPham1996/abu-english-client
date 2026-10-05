import React, { useEffect, useState } from 'react';
import { Checkbox, Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '@/components/Modal';
import Input from '@/components/Input';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import Empty from '@/components/Empty';
import Loading from '@/components/Loading';
import { showNotification } from '@/utils/functions';
import { TRootState } from '@/redux/reducers';
import {
  EAddAssignmentQuestionsAction,
  EAddLessonQuestionsAction,
  EGetQuestionBankAction,
  addAssignmentQuestionsAction,
  addLessonQuestionsAction,
  getQuestionBankAction,
} from '@/redux/actions';
import { dataLessonTypeOptions } from '@/common/constants';
import { ETypeNotification } from '@/common/enums';
import { TQuestion } from '@/common/models';

const collectSourceIds = (questions: TQuestion[] = []): Set<string> => {
  const ids = new Set<string>();
  questions.forEach((question) => {
    if (question.sourceQuestionId) ids.add(question.sourceQuestionId);
    question.children?.forEach((child) => {
      if (child.sourceQuestionId) ids.add(child.sourceQuestionId);
    });
  });
  return ids;
};

const isQuestionAlreadyAdded = (question: TQuestion, addedIds: Set<string>): boolean => {
  if (!addedIds.has(question.id)) return false;
  return (question.children || []).every((child) => addedIds.has(child.id));
};

import { TModalPickBankQuestionsProps } from './ModalPickBankQuestions.types';

const ModalPickBankQuestions: React.FC<TModalPickBankQuestionsProps> = ({
  visible,
  assignment,
  lesson,
  onClose,
  onSuccess,
}) => {
  const dispatch = useDispatch();
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const target = lesson || assignment;

  const questionsState = useSelector((state: TRootState) => state.questionBankReducer.getQuestionBankResponse);
  const getLoading = useSelector((state: TRootState) => state.loadingReducer[EGetQuestionBankAction.GET_QUESTION_BANK]);
  const submitLoading = useSelector(
    (state: TRootState) =>
      state.loadingReducer[
        lesson
          ? EAddLessonQuestionsAction.ADD_LESSON_QUESTIONS
          : EAddAssignmentQuestionsAction.ADD_ASSIGNMENT_QUESTIONS
      ],
  );

  const typeLabel = dataLessonTypeOptions.find((option) => option.value === target?.type)?.label?.toLowerCase();
  const addedIds = collectSourceIds(target?.questions || []);
  const questions = ((questionsState?.data || []) as TQuestion[]).filter(
    (item) => (!target?.type || item.type === target.type) && !isQuestionAlreadyAdded(item, addedIds),
  );

  const handleSubmit = (): void => {
    if (!target?.id || selectedIds.length === 0) return;

    const request = lesson ? addLessonQuestionsAction.request : addAssignmentQuestionsAction.request;

    dispatch(
      request({ paths: { id: target.id }, body: { questionIds: selectedIds } }, (response) => {
        const copied = (response as { copied?: number } | undefined)?.copied;
        if (!copied) {
          showNotification(ETypeNotification.WARNING, 'Câu hỏi đã có trong bài tập.');
          onClose?.();
          return;
        }
        showNotification(ETypeNotification.SUCCESS, 'Đã thêm câu hỏi vào bài tập.');
        onSuccess?.();
        onClose?.();
      }),
    );
  };

  useEffect(() => {
    if (visible && target?.type) {
      setSelectedIds([]);
      dispatch(
        getQuestionBankAction.request({
          params: { page: 1, pageSize: 50, type: target.type, search: search || undefined },
        }),
      );
    }
  }, [visible, target?.type, search, dispatch, target]);

  return (
    <Modal
      title={`Thêm câu hỏi ${typeLabel || ''} từ ngân hàng`.replace(/\s+/g, ' ').trim()}
      visible={visible}
      onClose={onClose}
      onSubmit={handleSubmit}
      width={640}
      showActions
      loading={submitLoading}
      confirmButton={{ title: `Thêm (${selectedIds.length})`, disabled: selectedIds.length === 0 }}
    >
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Input
            placeholder="Tìm kiếm câu hỏi"
            suffix={<Icon name={EIconName.Search} color={EIconColor.SHARK} />}
            onSearch={(keyword): void => setSearch(keyword || '')}
          />
        </Col>
        <Col span={24}>
          {getLoading ? (
            <div className="flex items-center justify-center">
              <Loading />
            </div>
          ) : questions.length === 0 ? (
            <Empty />
          ) : (
            <div className="QuestionPickerList">
              {questions.map((item) => (
              <div key={item.id} className="QuestionPickerList-item">
                <Checkbox
                  checked={selectedIds.includes(item.id)}
                  onChange={(e): void => {
                    if (e.target.checked) setSelectedIds([...selectedIds, item.id]);
                    else setSelectedIds(selectedIds.filter((id) => id !== item.id));
                  }}
                >
                  <span
                    className="QuestionPickerList-title ellipsis-1"
                    dangerouslySetInnerHTML={{ __html: item.question || '' }}
                  />
                </Checkbox>
              </div>
            ))}
            </div>
          )}
        </Col>
      </Row>
    </Modal>
  );
};

export default ModalPickBankQuestions;
