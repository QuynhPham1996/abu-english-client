import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'antd';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import SEO from '@/components/SEO';
import { getFullPath, validationRules } from '@/utils/functions';
import Input from '@/components/Input';
import Button, { EButtonStyleType } from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import { EIconName } from '@/components/Icon';
import Helpers from '@/services/helpers';
import { Paths } from '@/routers/constants';
import Avatar from '@/components/Avatar';
import Auth from '@/layouts/Auth';
import { EGetMyProfileAction, ELoginAction, getMyProfileAction, loginAction } from '@/redux/actions';
import { EUserRole } from '@/common/enums';
import { TRootState } from '@/redux/reducers';

import { TLoginRememberAccountData } from './Login.types';
import { ServerAuthRoute } from '@/utils/server-side';
import { GetServerSideProps } from 'next';

const Login = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const dispatch = useDispatch();

  const [rememberAccountData, setRememberAccountData] = useState<TLoginRememberAccountData>();
  const isExistedRememberAccount = Boolean(rememberAccountData?.username);

  const loginLoading = useSelector((state: TRootState) => state.loadingReducer[ELoginAction.LOGIN]);
  const getMyProfileLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EGetMyProfileAction.GET_MY_PROFILE],
  );

  const loading = loginLoading || getMyProfileLoading;

  const handleLoginAnotherAccount = (): void => {
    Helpers.setDataRememberAccount({});
    form.resetFields();
    setRememberAccountData({});
  };

  const handleSubmit = (values: any): void => {
    const body = {
      username: rememberAccountData?.username || values?.username,
      password: values?.password,
    };

    const isRemember = isExistedRememberAccount || values?.isRemember;
    dispatch(loginAction.request({ body }, (): void => handleSubmitSuccess(isRemember)));
  };

  const handleSubmitSuccess = (isRemember: boolean): void => {
    console.log(Helpers.getAccessToken());
    dispatch(
      getMyProfileAction.request({}, (response): void => {
        const storageData = {
          name: response?.data?.name,
          username: response?.data?.username,
          email: response?.data?.email,
          avatar: response?.data?.avatar,
        };
        const isManager = [EUserRole.MANAGER, EUserRole.SUPER_ADMIN].includes(response?.data?.role as EUserRole);

        if (isRemember) {
          Helpers.setDataRememberAccount(storageData);
        }

        if (isManager) {
          router.push(Paths.UsersManagement);
        } else {
          router.push(Paths.Learn);
        }
      }),
    );
  };

  useEffect(() => {
    setRememberAccountData(Helpers.getDataRememberAccount());
  }, []);

  return (
    <>
      <SEO />
      {typeof rememberAccountData !== 'undefined' && (
        <div className="Login">
          <div className="Login-header">
            <h1 className="Login-title">{isExistedRememberAccount ? 'Chào Mừng Trở Lại' : 'Đăng Nhập'}</h1>
            <p className="Login-description">
              {isExistedRememberAccount ? (
                <>
                  Hệ thống đã lưu tài khoản <strong>“{rememberAccountData?.username}”</strong> lần đăng nhập trước đây.
                </>
              ) : (
                'Hey, Hello 👋'
              )}
            </p>
          </div>

          <Form layout="vertical" form={form} onFinish={handleSubmit}>
            <Row gutter={[24, 24]}>
              {isExistedRememberAccount ? (
                <>
                  <Col span={24}>
                    <div className="flex justify-center">
                      <Avatar
                        size={96}
                        name={rememberAccountData?.name}
                        image={getFullPath(rememberAccountData?.avatar)}
                        textSize="large"
                      />
                    </div>
                  </Col>
                </>
              ) : (
                <>
                  <Col span={24} style={{ marginBottom: -12 }}>
                    <Button
                      className="Login-social-btn"
                      title="Theo dõi Abu English Club"
                      iconName={EIconName.Facebook}
                      styleType={EButtonStyleType.OUTLINE_GEYSER}
                      link="https://www.facebook.com/profile.php?id=61552926075305"
                      targetLink="_blank"
                    />
                  </Col>
                  <Col span={24}>
                    <Button
                      className="Login-social-btn"
                      title="Tư vấn đăng ký tài khoản"
                      iconName={EIconName.Messenger}
                      styleType={EButtonStyleType.OUTLINE_GEYSER}
                      link="https://www.m.me/61552926075305"
                      targetLink="_blank"
                    />
                  </Col>
                  <Col span={24}>
                    <div className="Login-line">
                      <span>
                        <strong>hoặc</strong>
                      </span>
                    </div>
                  </Col>
                  <Col span={24}>
                    <Form.Item name="username" label="Tên đăng nhập" required rules={[validationRules.required()]}>
                      <Input />
                    </Form.Item>
                  </Col>
                </>
              )}

              <Col span={24}>
                <Form.Item name="password" label="Mật khẩu" required rules={[validationRules.required()]}>
                  <Input type="password" />
                </Form.Item>
              </Col>

              {!isExistedRememberAccount && (
                <Col span={24}>
                  <Form.Item name="isRemember">
                    <Checkbox label="Nhớ tài khoản" size="large" />
                  </Form.Item>
                </Col>
              )}

              <Col span={24}>
                <Button
                  htmlType="submit"
                  title="Đăng nhập"
                  styleType={EButtonStyleType.PRIMARY}
                  size="large"
                  loading={loading}
                />
              </Col>

              {isExistedRememberAccount && (
                <Col span={24} style={{ marginTop: -12 }}>
                  <Button
                    title="Sử dụng tài khoản khác"
                    styleType={EButtonStyleType.OUTLINE_GEYSER}
                    size="large"
                    disabled={loading}
                    onClick={handleLoginAnotherAccount}
                  />
                </Col>
              )}
            </Row>
          </Form>
        </div>
      )}
    </>
  );
};

export default Login;

Login.getLayout = function (page: React.ReactNode) {
  return <Auth>{page}</Auth>;
};

export const getServerSideProps: GetServerSideProps = async (context) => ServerAuthRoute(context);
