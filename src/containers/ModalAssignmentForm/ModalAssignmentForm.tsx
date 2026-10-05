import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '@/components/Modal';
import Input from '@/components/Input';
import Select from '@/components/Select';
import { showNotification, validationRules } from '@/utils/functions';
import { TRootState } from '@/redux/reducers';
import {
  ECreateAssignmentAction,
  EUpdateAssignmentAction,
  createAssignmentAction,
  updateAssignmentAction,
} from '@/redux/actions';
import { ELessonArrange, ELessonStatus, ELessonType, ETypeNotification } from '@/common/enums';
import { dataLessonArrangeOptions, dataLessonStatusOptions, dataLessonTypeOptions } from '@/common/constants';

import { TModalAssignmentFormProps } from './ModalAssignmentForm.types';

const ModalAssignmentForm: React.FC<TModalAssignmentFormProps> = ({ visible, data, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState<any>({});

  const createLoading = useSelector(
    (state: TRootState) => state.loadingReducer[ECreateAssignmentAction.CREATE_ASSIGNMENT],
  );
  const updateLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EUpdateAssignmentAction.UPDATE_ASSIGNMENT],
  );
  const loading = createLoading || updateLoading;

  const handleSubmit = (): void => {
    form.validateFields().then((values) => {
      const body = {
        name: values?.name,
        type: values?.type?.value,
        arrange: values?.arrange?.value,
        status: values?.status?.value,
      };

      if (data) {
        dispatch(
          updateAssignmentAction.request({ paths: { id: data.id }, body }, () => {
            showNotification(ETypeNotification.SUCCESS, 'Cập nhật bài tập thành công.');
            onSuccess?.();
            onClose?.();
          }),
        );
      } else {
        dispatch(
          createAssignmentAction.request({ body }, () => {
            showNotification(ETypeNotification.SUCCESS, 'Tạo mới bài tập thành công.');
            onSuccess?.(true);
            onClose?.();
          }),
        );
      }
    });
  };

  useEffect(() => {
    if (visible) {
      if (data) {
        const dataChanged = {
          name: data?.name,
          type: dataLessonTypeOptions.find((option) => option.value === data?.type),
          arrange: dataLessonArrangeOptions.find((option) => option.value === data?.arrange),
          status: dataLessonStatusOptions.find((option) => option.value === data?.status),
        };
        setFormValues(dataChanged);
        form.setFieldsValue(dataChanged);
      } else {
        const dataChanged = {
          type: dataLessonTypeOptions.find((option) => option.value === ELessonType.MULTIPLE_CHOICE),
          arrange: dataLessonArrangeOptions.find((option) => option.value === ELessonArrange.RANDOM),
          status: dataLessonStatusOptions.find((option) => option.value === ELessonStatus.PUBLIC),
        };
        setFormValues(dataChanged);
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
      title={`${data ? 'Sửa' : 'Tạo'} Bài Tập`}
      visible={visible}
      onClose={onClose}
      onSubmit={handleSubmit}
      width={480}
      showActions
      loading={loading}
    >
      <Form form={form} layout="vertical" onValuesChange={(_, values): void => setFormValues({ ...formValues, ...values })}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item label="Tên bài tập" name="name" required rules={[validationRules.required()]}>
              <Input />
            </Form.Item>
          </Col>
          {!data && (
            <Col span={24}>
              <Form.Item label="Loại bài tập" name="type" rules={[validationRules.required()]}>
                <Select options={dataLessonTypeOptions} />
              </Form.Item>
            </Col>
          )}
          <Col span={24}>
            <Form.Item label="Sắp xếp" name="arrange" rules={[validationRules.required()]}>
              <Select options={dataLessonArrangeOptions} />
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

export default ModalAssignmentForm;
