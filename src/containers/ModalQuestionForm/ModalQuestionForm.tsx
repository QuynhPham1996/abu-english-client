import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'antd';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '@/components/Modal';
import CkEditor from '@/components/CkEditor';
import { getArrayFrom0To, showNotification, validationRules } from '@/utils/functions';
import AnswersForm from '@/components/AnswersForm';
import { TRootState } from '@/redux/reducers';
import {
  ECreateQuestionAction,
  EUpdateQuestionAction,
  createQuestionAction,
  updateQuestionAction,
} from '@/redux/actions';
import { dataLessonTypeOptions } from '@/common/constants';
import { ELessonType, ETypeNotification } from '@/common/enums';

import { TModalQuestionFormProps } from './ModalQuestionForm.types';
import TextArea from '@/components/TextArea';

const ModalQuestionForm: React.FC<TModalQuestionFormProps> = ({
  visible,
  data,
  dataLesson,
  dataAssignment,
  onClose,
  onSuccess,
}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState<any>({});

  const createQuestionLoading = useSelector(
    (state: TRootState) => state.loadingReducer[ECreateQuestionAction.CREATE_QUESTION],
  );
  const updateQuestionLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EUpdateQuestionAction.UPDATE_QUESTION],
  );

  const loading = createQuestionLoading || updateQuestionLoading;
  const questionType = dataLesson?.type || dataAssignment?.type;
  const typeLabel = dataLessonTypeOptions.find((option) => option.value === questionType)?.label;

  const handleSubmit = (): void => {
    form.validateFields().then((values) => {
      const answers = questionType === ELessonType.MULTIPLE_CHOICE ? values?.answers : undefined;

      if (data) {
        dispatch(
          updateQuestionAction.request(
            { paths: { id: data?.id }, body: { question: values?.question, answers, note: values?.note } },
            handleSubmitSuccess,
          ),
        );
      } else {
        dispatch(
          createQuestionAction.request(
            {
              body: {
                question: values?.question,
                answers,
                lesson: dataLesson?.id,
                assignment: dataLesson?.id ? undefined : dataAssignment?.id,
                type: questionType,
                note: values?.note,
              },
            },
            handleSubmitSuccess,
          ),
        );
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

      if (data) {
        const dataChanged = {
          question: data?.question,
          answers: data?.answers,
          note: data?.note,
        };
        setFormValues({ ...formValues, ...dataChanged });
        form.setFieldsValue(dataChanged);
      } else {
        const dataChanged = {
          answers: getArrayFrom0To(4).map(() => ({
            id: uuidv4(),
            title: '',
            isCorrect: false,
          })),
        };
        setFormValues({ ...formValues, ...dataChanged });
        form.setFieldsValue(dataChanged);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, visible, data]);

  return (
    <Modal
      title={`${data ? 'Sửa' : 'Tạo'} câu hỏi${typeLabel ? ` ${typeLabel.toLowerCase()}` : ''}`}
      visible={visible}
      onClose={onClose}
      onSubmit={handleSubmit}
      width={720}
      showActions
      loading={loading}
    >
      <div className="ModalQuestionForm-wrapper">
        <Form
          form={form}
          layout="vertical"
          onValuesChange={(_, values): void => setFormValues({ ...formValues, ...values })}
        >
          <Row gutter={[16, 16]}>
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
            {dataLesson?.type === ELessonType.MULTIPLE_CHOICE && (
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
              <Form.Item label="Ghi chú" name="note">
                <TextArea maxLength={255} showCount />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default ModalQuestionForm;
