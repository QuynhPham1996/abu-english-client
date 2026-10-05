import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '@/components/Modal';
import Input from '@/components/Input';
import Select from '@/components/Select';
import TextArea from '@/components/TextArea';
import { showNotification, validationRules } from '@/utils/functions';
import { TRootState } from '@/redux/reducers';
import {
  ECreateQuestionGroupAction,
  EUpdateQuestionGroupAction,
  createQuestionGroupAction,
  updateQuestionGroupAction,
} from '@/redux/actions';
import { ELessonStatus, ETypeNotification } from '@/common/enums';
import { dataLessonStatusOptions } from '@/common/constants';
import { TCreateQuestionGroupResponse } from '@/services/api';

import { TModalQuestionGroupFormProps } from './ModalQuestionGroupForm.types';

const ModalQuestionGroupForm: React.FC<TModalQuestionGroupFormProps> = ({
  visible,
  data,
  zIndex,
  onClose,
  onSuccess,
}) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState<any>({});

  const createLoading = useSelector(
    (state: TRootState) => state.loadingReducer[ECreateQuestionGroupAction.CREATE_QUESTION_GROUP],
  );
  const updateLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EUpdateQuestionGroupAction.UPDATE_QUESTION_GROUP],
  );
  const loading = createLoading || updateLoading;

  const handleSubmit = (): void => {
    form.validateFields().then((values) => {
      const body = {
        name: values?.name,
        description: values?.description,
        status: values?.status?.value,
      };

      if (data) {
        dispatch(updateQuestionGroupAction.request({ paths: { id: data.id }, body }, handleSubmitSuccess));
      } else {
        dispatch(createQuestionGroupAction.request({ body }, handleSubmitSuccess));
      }
    });
  };

  const handleSubmitSuccess = (response?: TCreateQuestionGroupResponse | unknown): void => {
    const created = (response as TCreateQuestionGroupResponse | undefined)?.data;
    showNotification(ETypeNotification.SUCCESS, `${data ? 'Cập nhật' : 'Tạo mới'} nhóm câu hỏi thành công.`);
    onSuccess?.(data || created);
    onClose?.();
  };

  useEffect(() => {
    if (visible) {
      if (data) {
        const dataChanged = {
          name: data?.name,
          description: data?.description,
          status: dataLessonStatusOptions.find((option) => option.value === data?.status),
        };
        setFormValues({ ...formValues, ...dataChanged });
        form.setFieldsValue(dataChanged);
      } else {
        const dataChanged = {
          status: dataLessonStatusOptions.find((option) => option.value === ELessonStatus.PUBLIC),
        };
        setFormValues({ ...formValues, ...dataChanged });
        form.setFieldsValue(dataChanged);
      }
    } else {
      setFormValues({});
      form.resetFields();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, visible, data]);

  return (
    <Modal
      title={`${data ? 'Sửa' : 'Tạo'} Nhóm Câu Hỏi`}
      visible={visible}
      onClose={onClose}
      onSubmit={handleSubmit}
      width={480}
      zIndex={zIndex}
      showActions
      loading={loading}
    >
      <Form form={form} layout="vertical" onValuesChange={(_, values): void => setFormValues({ ...formValues, ...values })}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item label="Tên nhóm" name="name" required rules={[validationRules.required()]}>
              <Input />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Mô tả" name="description">
              <TextArea />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item label="Trạng thái" name="status" rules={[validationRules.required()]}>
              <Select options={dataLessonStatusOptions} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default ModalQuestionGroupForm;
