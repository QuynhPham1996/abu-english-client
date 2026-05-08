import React, { useCallback, useEffect } from 'react';
import { Col, Form, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { showNotification, validationRules } from '@/utils/functions';
import Input from '@/components/Input';
import Button, { EButtonStyleType } from '@/components/Button';
import { EUpdateMyProfileAction, updateMyProfileAction, getMyProfileAction } from '@/redux/actions';
import { ETypeNotification } from '@/common/enums';
import { TRootState } from '@/redux/reducers';

import { TProfileInformationProps } from './ProfileInformation.types';

const ProfileInformation: React.FC<TProfileInformationProps> = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const myProfileState = useSelector((state: TRootState) => state.userReducer.getMyProfileResponse)?.data;
  const updateMyProfileLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EUpdateMyProfileAction.UPDATE_MY_PROFILE],
  );

  const handleSubmit = (values: any): void => {
    const body = {
      name: values?.name,
      email: values?.email,
      phoneNumber: values?.phoneNumber,
    };

    dispatch(updateMyProfileAction.request({ body }, handleSubmitSuccess));
  };

  const getMyProfile = useCallback(() => {
    dispatch(getMyProfileAction.request({}));
  }, [dispatch]);

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, 'Cập nhật thông tin cá nhân thành công.');
    getMyProfile();
  };

  useEffect(() => {
    if (myProfileState) {
      const dataUpdated = {
        name: myProfileState?.name,
        email: myProfileState?.email,
        phoneNumber: myProfileState?.phoneNumber,
      };
      form.setFieldsValue(dataUpdated);
    }
  }, [form, myProfileState]);

  return (
    <div className="ProfileInformation">
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Form.Item name="name" label="Họ và tên" required rules={[validationRules.required()]}>
              <Input />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name="email"
              label="Email"
              required
              rules={[validationRules.required(), validationRules.email()]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              name="phoneNumber"
              label="Số điện thoại"
              required
              rules={[validationRules.required(), validationRules.phoneNumberVietnam()]}
            >
              <Input numberic numberstring />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Button
              title="Sửa thông tin"
              htmlType="submit"
              loading={updateMyProfileLoading}
              styleType={EButtonStyleType.PRIMARY}
              style={{ width: '12rem', margin: 'auto' }}
            />
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ProfileInformation;
