import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '@/components/Modal';
import Input from '@/components/Input';
import { showNotification, validationRules } from '@/utils/functions';
import Select from '@/components/Select';
import TextArea from '@/components/TextArea';
import { EExerciseStatus, ETypeNotification } from '@/common/enums';
import {
  ECreateExerciseAction,
  EUpdateExerciseAction,
  createExerciseAction,
  updateExerciseAction,
} from '@/redux/actions';
import { TRootState } from '@/redux/reducers';
import { dataExerciseStatusOptions } from '@/common/constants';

import { TModalExerciseFormProps } from './ModalExerciseForm.types';
import HelpBadge, { EHelpBadgeType } from '@/components/HelpBadge';

const ModalExerciseForm: React.FC<TModalExerciseFormProps> = ({ visible, data, dataCourse, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState<any>({});

  const createExerciseLoading = useSelector(
    (state: TRootState) => state.loadingReducer[ECreateExerciseAction.CREATE_EXERCISE],
  );
  const updateExerciseLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EUpdateExerciseAction.UPDATE_EXERCISE],
  );

  const loading = createExerciseLoading || updateExerciseLoading;

  const handleSubmit = (): void => {
    form.validateFields().then((values) => {
      const body = {
        name: values?.name,
        description: values?.description,
        status: values?.status?.value,
        course: !data ? dataCourse?.id : undefined,
      };

      if (data) {
        dispatch(updateExerciseAction.request({ paths: { id: data?.id }, body }, handleSubmitSuccess));
      } else {
        dispatch(createExerciseAction.request({ body }, handleSubmitSuccess));
      }
    });
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, `${data ? 'Cập nhật' : 'Tạo mới'} bài học thành công.`);
    onSuccess?.();
    onClose?.();
  };

  useEffect(() => {
    if (visible) {
      if (data) {
        const dataChanged = {
          name: data?.name,
          description: data?.description,
          status: dataExerciseStatusOptions.find((option) => option.value === data?.status),
        };
        setFormValues({ ...formValues, ...dataChanged });
        form.setFieldsValue(dataChanged);
      }
    } else {
      form.resetFields();
      setFormValues({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, visible, data]);

  return (
    <Modal
      title={`${data ? 'Sửa' : 'Tạo'} Bài Học`}
      visible={visible}
      onClose={onClose}
      onSubmit={handleSubmit}
      width={720}
      showActions
      loading={loading}
    >
      <div className="ModalExerciseForm-wrapper">
        <Form
          form={form}
          layout="vertical"
          onValuesChange={(_, values): void => setFormValues({ ...formValues, ...values })}
        >
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Form.Item label="Tên bài học" name="name" required rules={[validationRules.required()]}>
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Trạng thái"
                name="status"
                rules={[validationRules.required()]}
                initialValue={dataExerciseStatusOptions.find((option) => option.value === EExerciseStatus.PUBLIC)}
              >
                <Select options={dataExerciseStatusOptions} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Mô tả" name="description">
                <TextArea />
              </Form.Item>
            </Col>
            {formValues?.status?.value === EExerciseStatus.PRIVATE && (
              <Col span={24}>
                <HelpBadge
                  type={EHelpBadgeType.WARNING}
                  title={`Bài học có trạng thái “${formValues?.status?.label}” sẽ không được hiển thị trong khoá học. Dữ liệu thông tin và tiến độ học tập của các học viên đã học bài học này vẫn sẽ được lưu lại.`}
                />
              </Col>
            )}
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default ModalExerciseForm;
