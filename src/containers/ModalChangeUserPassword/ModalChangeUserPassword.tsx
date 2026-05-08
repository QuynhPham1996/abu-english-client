import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '@/components/Modal';
import { copyText, generateInitialPassword, showNotification, validationRules } from '@/utils/functions';
import HelpBadge, { EHelpBadgeType } from '@/components/HelpBadge';
import Input from '@/components/Input';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import Tooltip from '@/components/Tooltip';
import { EChangeUserPasswordAction, changeUserPasswordAction } from '@/redux/actions';
import { ETypeNotification } from '@/common/enums';
import { TRootState } from '@/redux/reducers';

import { TModalChangeUserPasswordProps } from './ModalChangeUserPassword.types';

const ModalChangeUserPassword: React.FC<TModalChangeUserPasswordProps> = ({ visible, data, onClose }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState<any>({});

  const changeUserPasswordLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EChangeUserPasswordAction.CHANGE_USER_PASSWORD],
  );

  const handleSubmit = (): void => {
    form.validateFields().then((values) => {
      const body = {
        newPassword: values?.password,
      };

      dispatch(changeUserPasswordAction.request({ paths: { id: data?.id }, body }, handleSubmitSuccess));
    });
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, 'Thay đổi mật khẩu người dùng thành công.');
    onClose?.();
  };

  const handleGeneratePassword = (): void => {
    const dataChanged = {
      password: generateInitialPassword(),
    };
    form.setFieldsValue(dataChanged);
    setFormValues({ ...formValues, ...dataChanged });
  };

  useEffect(() => {
    if (visible) {
      const dataChanged = {
        password: generateInitialPassword(),
      };
      setFormValues({ ...formValues, ...dataChanged });
      form.setFieldsValue(dataChanged);
    } else {
      form.resetFields();
      setFormValues({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, form]);

  return (
    <Modal
      title="Đổi mật khẩu"
      visible={visible}
      onClose={onClose}
      onSubmit={handleSubmit}
      loading={changeUserPasswordLoading}
      showActions
    >
      <div className="ModalChangeUserPassword-wrapper">
        <Form
          form={form}
          layout="vertical"
          onValuesChange={(_, values): void => setFormValues({ ...formValues, ...values })}
        >
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <HelpBadge type={EHelpBadgeType.INFO} title={`Bạn đang đổi mật khẩu cho người dùng “${data?.name}”.`} />
            </Col>
            <Col span={24}>
              <Form.Item name="password" label="Mật khẩu mới" required rules={[validationRules.required()]}>
                <Input
                  prefix={
                    <Tooltip title="Làm mới" placement="left">
                      <Icon
                        className="cursor-pointer"
                        name={EIconName.Reload}
                        color={EIconColor.SHARK}
                        onClick={handleGeneratePassword}
                      />
                    </Tooltip>
                  }
                  suffix={
                    <Tooltip trigger={['click']} title="Sao chép thành công" placement="right">
                      <Icon
                        className="cursor-pointer"
                        name={EIconName.Copy}
                        color={EIconColor.SHARK}
                        onClick={(): void => {
                          copyText(formValues?.password);
                        }}
                      />
                    </Tooltip>
                  }
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default ModalChangeUserPassword;
