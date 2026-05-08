import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '@/components/Modal';
import Input from '@/components/Input';
import {
  copyText,
  generateInitialPassword,
  getFullPath,
  quickUploadImage,
  showNotification,
  validationRules,
} from '@/utils/functions';
import Tooltip from '@/components/Tooltip';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import Select from '@/components/Select';
import UploadImage from '@/components/UploadImage';
import { dataUserStatusOptions } from '@/common/constants';
import { ETypeNotification, EUserStatus } from '@/common/enums';
import { ECreateUserAction, EUpdateUserAction, createUserAction, updateUserAction } from '@/redux/actions';
import { TRootState } from '@/redux/reducers';

import { TModalUserFormProps } from './ModalUserForm.types';
import HelpBadge, { EHelpBadgeType } from '@/components/HelpBadge';

const ModalUserForm: React.FC<TModalUserFormProps> = ({ visible, data, role, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState<any>({});
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);

  const createUserLoading = useSelector((state: TRootState) => state.loadingReducer[ECreateUserAction.CREATE_USER]);
  const updateUserLoading = useSelector((state: TRootState) => state.loadingReducer[EUpdateUserAction.UPDATE_USER]);

  const loading = createUserLoading || updateUserLoading || uploadLoading;

  const handleSubmit = (): void => {
    form.validateFields().then(async (values) => {
      setUploadLoading(true);
      const avatar = await quickUploadImage({ oldFilePath: data?.avatar, newFile: values?.avatar });
      setUploadLoading(false);

      const body = {
        avatar,
        name: values?.name,
        username: values?.username,
        password: values?.password,
        email: values?.email,
        phoneNumber: values?.phoneNumber,
        status: values?.status?.value,
        role: !data ? role : undefined,
      };

      if (data) {
        dispatch(updateUserAction.request({ paths: { id: data?.id }, body }, handleSubmitSuccess));
      } else {
        dispatch(createUserAction.request({ body }, handleSubmitSuccess));
      }
    });
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, `${data ? 'Cập nhật' : 'Tạo mới'} người dùng thành công.`);
    onSuccess?.();
    onClose?.();
  };

  useEffect(() => {
    if (visible) {
      if (data) {
        const dataChanged = {
          avatar: getFullPath(data?.avatar),
          name: data?.name,
          email: data?.email,
          phoneNumber: data?.phoneNumber,
          status: dataUserStatusOptions.find((option) => option.value === data?.status),
        };
        setFormValues({ ...formValues, ...dataChanged });
        form.setFieldsValue(dataChanged);
      } else {
        const dataChanged = {
          status: dataUserStatusOptions.find((option) => option.value === EUserStatus.ACTIVE),
          password: generateInitialPassword(),
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
      title={`${data ? 'Sửa' : 'Tạo'} Người Dùng`}
      visible={visible}
      onClose={onClose}
      onSubmit={handleSubmit}
      width={480}
      showActions
      loading={loading}
    >
      <div className="ModalUserForm-wrapper">
        <Form
          form={form}
          layout="vertical"
          onValuesChange={(_, values): void => setFormValues({ ...formValues, ...values })}
        >
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item label="Ảnh đại diện" name="avatar" rules={[validationRules.fileImages()]}>
                <UploadImage shape="circle" avatar sizeImage={96} />
              </Form.Item>
            </Col>

            {!data && (
              <Col span={24}>
                <Form.Item
                  label="Tên đăng nhập"
                  name="username"
                  required
                  rules={[validationRules.required(), validationRules.noSpecialKey()]}
                >
                  <Input />
                </Form.Item>
              </Col>
            )}

            <Col span={24}>
              <Form.Item label="Họ và tên" name="name" required rules={[validationRules.required()]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Email" name="email" rules={[validationRules.email()]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Số điện thoại" name="phoneNumber" rules={[validationRules.phoneNumberVietnam()]}>
                <Input numberic numberstring />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Trạng thái" name="status" rules={[validationRules.required()]}>
                <Select options={dataUserStatusOptions} />
              </Form.Item>
            </Col>
            {formValues?.status?.value === EUserStatus.INACTIVE && (
              <Col span={24}>
                <HelpBadge
                  type={EHelpBadgeType.WARNING}
                  title={`Học viên có trạng thái “${formValues?.status?.label}” sẽ không có quyền truy cập hệ thống. Dữ liệu thông tin của học viên này vẫn sẽ được lưu lại.`}
                />
              </Col>
            )}

            {!data && (
              <Col span={24}>
                <Form.Item
                  label="Mật khẩu"
                  name="password"
                  required
                  rules={[validationRules.required(), validationRules.minLength(8)]}
                >
                  <Input
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
            )}
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default ModalUserForm;
