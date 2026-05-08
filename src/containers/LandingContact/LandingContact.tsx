import React from 'react';
import { Col, Form, Row } from 'antd';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';

import ImageLandingContact from '@/assets/images/image-landing-contact.png';
import Input from '@/components/Input';
import Button, { EButtonStyleType } from '@/components/Button';
import TextArea from '@/components/TextArea';
import { showNotification, validationRules } from '@/utils/functions';
import { ESendContactAction, sendContactAction } from '@/redux/actions';
import { ETypeNotification } from '@/common/enums';
import { TRootState } from '@/redux/reducers';

import { TLandingContactProps } from './LandingContact.types.d';

const LandingContact: React.FC<TLandingContactProps> = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const sendContactLoading = useSelector((state: TRootState) => state.loadingReducer[ESendContactAction.SEND_CONTACT]);

  const handleSubmit = (values: any): void => {
    const body = {
      name: values?.name,
      phoneNumber: values?.phoneNumber,
      message: values?.message,
    };

    dispatch(sendContactAction.request({ body }, handleSubmitSuccess));
  };

  const handleSubmitSuccess = (): void => {
    showNotification(
      ETypeNotification.SUCCESS,
      'Bạn đã gửi yêu cầu đăng ký thành công. Vui lòng chờ quản trị viên phản hồi.',
    );
    form.resetFields();
  };

  return (
    <section className="LandingContact" id="contact">
      <div className="container">
        <div className="LandingContact-wrapper">
          <Row gutter={[64, 64]} align="middle">
            <Col span={24} lg={{ span: 12 }}>
              <h5 className="LandingContact-title">Bạn vẫn chưa biết khóa học nào phù hợp với mình?</h5>
              <p className="LandingContact-description">Đăng ký liên hệ tư vấn miễn phí tại ABU English Club</p>

              <Form form={form} layout="vertical" className="LandingContact-form" onFinish={handleSubmit}>
                <Row gutter={[16, 16]}>
                  <Col span={24}>
                    <Form.Item name="name" rules={[validationRules.required()]}>
                      <Input placeholder="Họ và tên" />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      name="phoneNumber"
                      rules={[validationRules.required(), validationRules.phoneNumberVietnam()]}
                    >
                      <Input placeholder="Số điện thoại" numberic numberstring />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item name="message">
                      <TextArea placeholder="Lời nhắn" />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Button
                      title="Đăng ký tư vấn"
                      styleType={EButtonStyleType.WHITE}
                      htmlType="submit"
                      disabled={sendContactLoading}
                    />
                  </Col>
                </Row>
              </Form>
            </Col>
            <Col span={24} lg={{ span: 12 }}>
              <div className="LandingContact-image">
                <Image src={ImageLandingContact} alt="" />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </section>
  );
};

export default LandingContact;
