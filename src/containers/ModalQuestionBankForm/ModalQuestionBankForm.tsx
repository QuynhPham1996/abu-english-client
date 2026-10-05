import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '@/components/Modal';
import Button, { EButtonStyleType } from '@/components/Button';
import { EIconColor, EIconName } from '@/components/Icon';
import CkEditor from '@/components/CkEditor';
import AnswersForm from '@/components/AnswersForm';
import Select from '@/components/Select';
import TextArea from '@/components/TextArea';
import { getArrayFrom0To, showNotification, validationRules } from '@/utils/functions';
import { TRootState } from '@/redux/reducers';
import {
  ECreateQuestionBankAction,
  EUpdateQuestionBankAction,
  createQuestionBankAction,
  getQuestionGroupsAction,
  updateQuestionBankAction,
} from '@/redux/actions';
import { ELessonType, ETypeNotification } from '@/common/enums';
import { dataLessonTypeOptions } from '@/common/constants';
import { TAnswer, TQuestionGroup } from '@/common/models';
import ModalQuestionGroupForm from '@/containers/ModalQuestionGroupForm';

import { TModalQuestionBankFormProps } from './ModalQuestionBankForm.types';

type TChildDraft = {
  key: string;
  id?: string;
  question: string;
  type: string;
  answers: TAnswer[];
  note?: string;
};

const createAnswers = (): TAnswer[] =>
  getArrayFrom0To(4).map(() => ({
    id: uuidv4(),
    title: '',
    isCorrect: false,
  }));

const createChild = (): TChildDraft => ({
  key: uuidv4(),
  question: '',
  type: ELessonType.MULTIPLE_CHOICE,
  answers: createAnswers(),
});

const ModalQuestionBankForm: React.FC<TModalQuestionBankFormProps> = ({
  visible,
  data,
  groups = [],
  lockGroup,
  onClose,
  onSuccess,
}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState<any>({});
  const [children, setChildren] = useState<TChildDraft[]>([]);
  const [extraGroups, setExtraGroups] = useState<TQuestionGroup[]>([]);
  const [groupFormVisible, setGroupFormVisible] = useState<boolean>(false);

  const createLoading = useSelector(
    (state: TRootState) => state.loadingReducer[ECreateQuestionBankAction.CREATE_QUESTION_BANK],
  );
  const updateLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EUpdateQuestionBankAction.UPDATE_QUESTION_BANK],
  );
  const loading = createLoading || updateLoading;
  const isMultipleChoice = formValues?.type?.value === ELessonType.MULTIPLE_CHOICE;
  const hasChildren = children.length > 0;

  const groupOptions = [...extraGroups, ...groups]
    .filter((item, index, list) => list.findIndex((group) => group.id === item.id) === index)
    .map((item) => ({ label: item.name, value: item.id }));

  const handleGroupCreated = (group?: TQuestionGroup): void => {
    if (!group?.id) return;

    setExtraGroups((current) => [group, ...current.filter((item) => item.id !== group.id)]);
    const option = { label: group.name, value: group.id };
    form.setFieldsValue({ group: option });
    setFormValues((current: Record<string, unknown>) => ({ ...current, group: option }));
    dispatch(
      getQuestionGroupsAction.request({
        params: { page: 1, pageSize: 100 },
      }),
    );
  };

  const updateChild = (key: string, patch: Partial<TChildDraft>): void => {
    setChildren((current) => current.map((child) => (child.key === key ? { ...child, ...patch } : child)));
  };

  const handleSubmit = (): void => {
    const invalidChild = children.find(
      (child) =>
        !child.question?.trim() ||
        (child.type === ELessonType.MULTIPLE_CHOICE &&
          (child.answers.filter((answer) => answer.title).length < 2 ||
            !child.answers.some((answer) => answer.isCorrect))),
    );
    if (invalidChild) {
      showNotification(
        ETypeNotification.ERROR,
        'Mỗi câu hỏi con cần nội dung. Câu trắc nghiệm cần ít nhất 2 đáp án và 1 đáp án đúng.',
      );
      return;
    }

    form.validateFields().then((values) => {
      const body = {
        question: values?.question,
        answers: hasChildren || !isMultipleChoice ? undefined : values?.answers,
        note: values?.note,
        type: values?.type?.value,
        group: lockGroup ? groups[0]?.id : values?.group?.value,
        children: children.map((child) => ({
          id: child.id,
          question: child.question,
          type: child.type,
          note: child.note,
          answers: child.type === ELessonType.MULTIPLE_CHOICE ? child.answers : undefined,
        })),
      };

      if (data) {
        dispatch(updateQuestionBankAction.request({ paths: { id: data.id }, body }, handleSubmitSuccess));
      } else {
        dispatch(createQuestionBankAction.request({ body }, handleSubmitSuccess));
      }
    });
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, `${data ? 'Cập nhật' : 'Tạo mới'} câu hỏi thành công.`);
    onSuccess?.();
    onClose?.();
  };

  useEffect(() => {
    if (visible) {
      form.resetFields();
      setFormValues({});
      setChildren(
        (data?.children || []).map((child) => ({
          key: child.id || uuidv4(),
          id: child.id,
          question: child.question,
          type: child.type || ELessonType.MULTIPLE_CHOICE,
          answers: child.answers?.length ? child.answers : createAnswers(),
          note: child.note,
        })),
      );

      if (data) {
        const groupId = typeof data?.group === 'object' ? data?.group?.id : data?.group;
        const dataChanged = {
          question: data?.question,
          answers: data?.answers,
          note: data?.note,
          type: dataLessonTypeOptions.find((option) => option.value === data?.type),
          group: groupOptions.find((option) => option.value === groupId),
        };
        setFormValues(dataChanged);
        form.setFieldsValue(dataChanged);
      } else {
        const lockedGroup =
          lockGroup && groups[0] ? { label: groups[0].name, value: groups[0].id } : undefined;
        const dataChanged = {
          type: dataLessonTypeOptions.find((option) => option.value === ELessonType.MULTIPLE_CHOICE),
          group: lockedGroup,
          answers: getArrayFrom0To(4).map(() => ({
            id: uuidv4(),
            title: '',
            isCorrect: false,
          })),
        };
        setFormValues(dataChanged);
        form.setFieldsValue(dataChanged);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, visible, data]);

  return (
    <>
    <Modal
      title={`${data ? 'Sửa' : 'Tạo'} Câu Hỏi Ngân Hàng`}
      visible={visible}
      onClose={onClose}
      onSubmit={handleSubmit}
      width={860}
      showActions
      loading={loading}
    >
      <Form form={form} layout="vertical" onValuesChange={(_, values): void => setFormValues({ ...formValues, ...values })}>
        <Row gutter={[16, 16]}>
          {!lockGroup && (
            <Col span={24}>
              <Form.Item label="Nhóm câu hỏi" required>
                <div className="flex items-start" style={{ gap: 12 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <Form.Item name="group" rules={[validationRules.required()]} style={{ marginBottom: 0 }}>
                      <Select options={groupOptions} placeholder="Chọn nhóm" />
                    </Form.Item>
                  </div>
                  <Button
                    title="Thêm nhanh"
                    iconName={EIconName.Plus}
                    iconColor={EIconColor.SHARK}
                    styleType={EButtonStyleType.OUTLINE_GEYSER}
                    style={{ width: '14rem', flex: 'none' }}
                    onClick={(): void => setGroupFormVisible(true)}
                  />
                </div>
              </Form.Item>
            </Col>
          )}
          <Col span={24}>
            <Form.Item label="Loại câu hỏi" name="type" required rules={[validationRules.required()]}>
              <Select options={dataLessonTypeOptions} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Câu hỏi" name="question" required rules={[validationRules.required()]}>
              <CkEditor
                toolbar={{
                  items: [
                    'fontColor',
                    '|',
                    'bold',
                    'italic',
                    'underline',
                    '|',
                    'alignment',
                    'outdent',
                    'indent',
                    '|',
                    'bulletedList',
                    'numberedList',
                    '|',
                    'undo',
                    'redo',
                  ],
                }}
              />
            </Form.Item>
          </Col>
          {isMultipleChoice && !hasChildren && (
            <Col span={24}>
              <Form.Item
                label="Câu trả lời"
                name="answers"
                required
                rules={[
                  validationRules.required(),
                  validationRules.answersFormAtLeastOneCorrect(),
                  validationRules.answersFormAtLeastOneCorrectRequiredEach(),
                ]}
              >
                <AnswersForm />
              </Form.Item>
            </Col>
          )}
          <Col span={24}>
            <div className="QuestionBankChildren">
              <div className="QuestionBankChildren-header flex items-center justify-between">
                <div>
                  <strong>Câu hỏi con</strong>
                  <p>Câu cha là phần nội dung. Mỗi câu con là một câu học viên phải trả lời.</p>
                </div>
                <Button
                  title="Thêm câu con"
                  size="small"
                  iconName={EIconName.Plus}
                  iconColor={EIconColor.WHITE}
                  styleType={EButtonStyleType.PRIMARY}
                  onClick={(): void => setChildren((current) => [...current, createChild()])}
                />
              </div>
              {children.length === 0 && <div className="QuestionBankChildren-empty">Chưa có câu hỏi con.</div>}
              {children.map((child, index) => (
                <div className="QuestionBankChildren-item" key={child.key}>
                  <div className="QuestionBankChildren-item-header flex items-center justify-between">
                    <span className="flex items-center">
                      <span className="QuestionBankChildren-index">{index + 1}</span>
                      Câu con {index + 1}
                    </span>
                    <Button
                      title="Xoá"
                      size="small"
                      styleType={EButtonStyleType.OUTLINE_GEYSER}
                      onClick={(): void =>
                        setChildren((current) => current.filter((item) => item.key !== child.key))
                      }
                    />
                  </div>
                  <Select
                    value={dataLessonTypeOptions.find((option) => option.value === child.type)}
                    options={dataLessonTypeOptions}
                    onChange={(option): void =>
                      updateChild(child.key, {
                        type: option?.value,
                        answers:
                          option?.value === ELessonType.MULTIPLE_CHOICE
                            ? child.answers?.length
                              ? child.answers
                              : createAnswers()
                            : [],
                      })
                    }
                  />
                  <TextArea
                    className="resizable"
                    placeholder="Nội dung câu hỏi con"
                    value={child.question}
                    onChange={(value): void => updateChild(child.key, { question: value || '' })}
                  />
                  {child.type === ELessonType.MULTIPLE_CHOICE && (
                    <AnswersForm
                      value={child.answers}
                      onChange={(answers): void => updateChild(child.key, { answers: answers || [] })}
                    />
                  )}
                </div>
              ))}
            </div>
          </Col>
          <Col span={24}>
            <Form.Item label="Ghi chú" name="note">
              <TextArea maxLength={255} showCount />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
    <ModalQuestionGroupForm
      visible={groupFormVisible}
      zIndex={1100}
      onClose={(): void => setGroupFormVisible(false)}
      onSuccess={handleGroupCreated}
    />
    </>
  );
};

export default ModalQuestionBankForm;
