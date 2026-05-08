import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import Modal from '@/components/Modal';
import Input from '@/components/Input';
import { getFullPath, quickUploadImage, showNotification, validationRules } from '@/utils/functions';
import Select from '@/components/Select';
import UploadImage from '@/components/UploadImage';
import TextArea from '@/components/TextArea';
import { ECourseLevel, ECourseStatus, ETypeNotification, EUserRole } from '@/common/enums';
import {
  ECreateCourseAction,
  EGetUsersAction,
  EUpdateCourseAction,
  createCourseAction,
  getUsersAction,
  updateCourseAction,
} from '@/redux/actions';
import { usePaginationLoadMoreOptionTool } from '@/utils/hooks';
import { dataCourseLevelOptions, dataCourseStatusOptions } from '@/common/constants';
import { TRootState } from '@/redux/reducers';

import { TModalCourseFormProps } from './ModalCourseForm.types';
import HelpBadge, { EHelpBadgeType } from '@/components/HelpBadge';

const ModalCourseForm: React.FC<TModalCourseFormProps> = ({ visible, data, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState<any>({});

  const createCourseLoading = useSelector(
    (state: TRootState) => state.loadingReducer[ECreateCourseAction.CREATE_COURSE],
  );
  const updateCourseLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EUpdateCourseAction.UPDATE_COURSE],
  );
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);

  const loading = createCourseLoading || updateCourseLoading || uploadLoading;

  const {
    options: usersOptions,
    handleLoadMore: handleLoadMoreUsers,
    handleSearch: handleSearchUsers,
  } = usePaginationLoadMoreOptionTool({
    actions: getUsersAction,
    reducer: 'userReducer',
    response: 'getUsersResponse',
    loadingAction: EGetUsersAction.GET_USERS,
    initialParams: {
      role: EUserRole.MANAGER,
    },
    availableToCall: Boolean(visible),
  });

  const handleSubmit = (): void => {
    form.validateFields().then(async (values) => {
      setUploadLoading(true);
      const image = await quickUploadImage({ oldFilePath: data?.image, newFile: values?.image });
      setUploadLoading(false);

      const body = {
        image,
        name: values?.name,
        description: values?.description,
        retailPrice: values?.retailPrice,
        sellingPrice: values?.sellingPrice,
        manager: values?.manager?.value,
        status: values?.status?.value,
        level: values?.level?.value,
      };

      if (data) {
        dispatch(updateCourseAction.request({ paths: { id: data?.id }, body }, handleSubmitSuccess));
      } else {
        dispatch(createCourseAction.request({ body }, handleSubmitSuccess));
      }
    });
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, `${data ? 'Cập nhật' : 'Tạo mới'} khoá học thành công.`);
    onClose?.();
    onSuccess?.();
  };

  useEffect(() => {
    if (visible) {
      if (data) {
        const dataChanged = {
          image: getFullPath(data?.image),
          name: data?.name,
          description: data?.description,
          retailPrice: data?.retailPrice,
          sellingPrice: data?.sellingPrice,
          manager: data?.manager ? { label: data?.manager?.name, value: data?.manager?.id, data: data?.manager } : undefined,
          status: dataCourseStatusOptions.find((option) => option.value === data?.status),
          level: dataCourseLevelOptions.find((option) => option.value === data?.level),
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
      title={`${data ? 'Sửa' : 'Tạo'} Khoá Học`}
      visible={visible}
      onClose={onClose}
      onSubmit={handleSubmit}
      width={480}
      showActions
      loading={loading}
    >
      <div className="ModalCourseForm-wrapper">
        <Form
          form={form}
          layout="vertical"
          onValuesChange={(_, values): void => setFormValues({ ...formValues, ...values })}
        >
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item label="Ảnh" name="image">
                <UploadImage />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Tên khoá học" name="name" required rules={[validationRules.required()]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Mô tả" name="description">
                <TextArea />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Giá niêm yết" name="retailPrice" rules={[validationRules.min(10000)]}>
                <Input suffix="đ" numberic useNumber numberWithSeperator />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Giá bán"
                name="sellingPrice"
                required
                rules={[validationRules.required(), validationRules.min(10000)]}
              >
                <Input suffix="đ" numberic useNumber numberWithSeperator />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Giảng viên" name="manager" required rules={[validationRules.required()]}>
                <Select options={usersOptions} onSearch={handleSearchUsers} onLoadMore={handleLoadMoreUsers} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Cấp độ"
                name="level"
                rules={[validationRules.required()]}
                initialValue={dataCourseLevelOptions.find((option) => option.value === ECourseLevel.MEDIUM)}
              >
                <Select options={dataCourseLevelOptions} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Trạng thái"
                name="status"
                rules={[validationRules.required()]}
                initialValue={dataCourseStatusOptions.find((option) => option.value === ECourseStatus.PUBLIC)}
              >
                <Select options={dataCourseStatusOptions} />
              </Form.Item>
            </Col>
            {[ECourseStatus.COMING_SOON, ECourseStatus.PRIVATE].includes(formValues?.status?.value) && (
              <Col span={24}>
                <HelpBadge
                  type={EHelpBadgeType.WARNING}
                  title={`Học viên sở hữu khoá học có trạng thái “${formValues?.status?.label}” sẽ không có quyền truy cập vào khoá học. Dữ liệu thông tin và tiến độ học tập của các học viên sở hữu khoá học này vẫn sẽ được lưu lại.`}
                />
              </Col>
            )}
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default ModalCourseForm;
