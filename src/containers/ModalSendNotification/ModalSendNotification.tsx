import React, { useEffect } from 'react';
import { Col, Form, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '@/components/Modal';
import { showNotification, validationRules } from '@/utils/functions';
import TextArea from '@/components/TextArea';
import HelpBadge, { EHelpBadgeType } from '@/components/HelpBadge';
import { ECreateNotificationAction, createNotificationAction } from '@/redux/actions';
import { ENotificationType, ETypeNotification } from '@/common/enums';
import { TRootState } from '@/redux/reducers';
import Checkbox from '@/components/Checkbox';

import { TModalSendNotificationProps } from './ModalSendNotification.types';

const ModalSendNotification: React.FC<TModalSendNotificationProps> = ({ visible, data, onClose }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const createNotificationLoading = useSelector(
    (state: TRootState) => state.loadingReducer[ECreateNotificationAction.CREATE_NOTIFICATION],
  );

  const handleSubmit = (): void => {
    form.validateFields().then((values) => {
      const body = {
        type: ENotificationType.MESSAGE,
        message: values?.message,
        toUser: data?.id,
        isSendEmail: values?.isSendEmail,
      };

      dispatch(createNotificationAction.request({ body }, handleSubmitSuccess));
    });
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, 'Gửi thông báo cho người dùng thành công.');
    onClose?.();
  };

  useEffect(() => {
    if (visible) {
      const dataChanged = {
        isSendEmail: Boolean(data?.email),
      };
      form.setFieldsValue(dataChanged);
    } else {
      form.resetFields();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, visible]);

  return (
    <Modal
      title="Gửi thông báo"
      visible={visible}
      onClose={onClose}
      onSubmit={handleSubmit}
      loading={createNotificationLoading}
      showActions
    >
      <div className="ModalSendNotification-wrapper">
        <Form form={form} layout="vertical">
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <HelpBadge
                type={EHelpBadgeType.INFO}
                title={`Hệ thống sẽ gửi thông báo đến người dùng “${data?.name}”.`}
              />
            </Col>
            <Col span={24}>
              <Form.Item name="message" label="Tin nhắn" required rules={[validationRules.required()]}>
                <TextArea />
              </Form.Item>
            </Col>
            {data?.email && (
              <Col span={24}>
                <Form.Item name="isSendEmail">
                  <Checkbox label={`Gửi thông báo tới email “${data?.email}”`} size="large" />
                </Form.Item>
              </Col>
            )}
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default ModalSendNotification;
