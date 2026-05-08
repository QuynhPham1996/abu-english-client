import React, { useState } from 'react';
import { Col, Form, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { showNotification, validationRules } from '@/utils/functions';
import Input from '@/components/Input';
import Button, { EButtonStyleType } from '@/components/Button';

import { TProfileChangePasswordProps } from './ProfileChangePassword.types';
import { EChangeMyProfilePasswordAction, changeMyProfilePasswordAction } from '@/redux/actions';
import { TRootState } from '@/redux/reducers';
import { ETypeNotification } from '@/common/enums';

const ProfileChangePassword: React.FC<TProfileChangePasswordProps> = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState<any>({});

  const changeMyProfilePasswordLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EChangeMyProfilePasswordAction.CHANGE_MY_PROFILE_PASSWORD],
  );

  const handleSubmit = (values: any): void => {
    const body = {
      oldPassword: values?.oldPassword,
      newPassword: values?.newPassword,
    };

    dispatch(changeMyProfilePasswordAction.request({ body }, handleSubmitSuccess));
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, 'Đổi mật khẩu thành công.');
    form.resetFields();
    setFormValues({});
  };

  return (
    <div className="ProfileChangePassword">
      <Form
        form={form}
        layout="vertical"
        onValuesChange={(_, values): void => setFormValues({ ...formValues, ...values })}
        onFinish={handleSubmit}
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item name="oldPassword" label="Mật khẩu cũ" required rules={[validationRules.required()]}>
              <Input type="password" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name="newPassword"
              label="Mật khẩu mới"
              required
              rules={[validationRules.required(), validationRules.min(8)]}
            >
              <Input type="password" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name="reNewPassword"
              label="Xác nhận mật khẩu mới"
              required
              rules={[validationRules.required(), validationRules.confirmPassword(formValues?.newPassword)]}
            >
              <Input type="password" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Button
              title="Đổi mật khẩu"
              htmlType="submit"
              styleType={EButtonStyleType.PRIMARY}
              style={{ width: '12rem', margin: 'auto' }}
              loading={changeMyProfilePasswordLoading}
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ProfileChangePassword;
