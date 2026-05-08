import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import Modal from '@/components/Modal';
import { showNotification } from '@/utils/functions';
import SelectMultiple from '@/components/SelectMultiple';
import HelpBadge, { EHelpBadgeType } from '@/components/HelpBadge';
import { ECourseStatus, ETypeNotification } from '@/common/enums';
import { EAddUserCoursesAction, EGetCoursesAction, addUserCoursesAction, getCoursesAction } from '@/redux/actions';
import { usePaginationLoadMoreOptionTool } from '@/utils/hooks';
import { TRootState } from '@/redux/reducers';
import { TSelectOption } from '@/components/Select';

import { TModalAddCoursesProps } from './ModalAddCourses.types';

const ModalAddCourses: React.FC<TModalAddCoursesProps> = ({ visible, data, dataCourse, onClose, onSuccess }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [formValues, setFormValues] = useState<any>({});

  const addUserCourses = useSelector(
    (state: TRootState) => state.loadingReducer[EAddUserCoursesAction.ADD_USER_COURSES],
  );

  const {
    options: coursesOptions,
    handleLoadMore: handleLoadMoreCourses,
    handleSearch: handleSearchCourses,
  } = usePaginationLoadMoreOptionTool({
    actions: getCoursesAction,
    reducer: 'courseReducer',
    response: 'getCoursesResponse',
    loadingAction: EGetCoursesAction.GET_COURSES,
    initialParams: {
      status: ECourseStatus.PUBLIC,
    },
    availableToCall: Boolean(visible),
  });

  const handleSubmit = (): void => {
    form.validateFields().then((values) => {
      const body = {
        courses: values?.courses?.map((item: TSelectOption) => item.value),
      };
      dispatch(addUserCoursesAction.request({ paths: { id: data?.id || '' }, body }, handleSubmitSuccess));
    });
  };

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, 'Cập nhật khoá học cho học viên thành công.');
    onClose?.();
    onSuccess?.();
  };

  useEffect(() => {
    if (visible) {
      if (data) {
        const coursesExisted = data?.courses?.map((item) => ({ label: item?.name, value: item?.id }));

        if (dataCourse) {
          const dataChanged = {
            courses: _.uniqBy([...coursesExisted, { label: dataCourse?.name, value: dataCourse?.id }], 'value'),
          };
          setFormValues({ ...formValues, ...dataChanged });
          form.setFieldsValue(dataChanged);
        } else {
          const dataChanged = {
            courses: coursesExisted,
          };
          setFormValues({ ...formValues, ...dataChanged });
          form.setFieldsValue(dataChanged);
        }
      }
    } else {
      form.resetFields();
      setFormValues({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, visible, data, dataCourse]);

  return (
    <Modal
      title="Thêm khoá học"
      visible={visible}
      onClose={onClose}
      onSubmit={handleSubmit}
      width={480}
      showActions
      zIndex={1051}
      loading={addUserCourses}
    >
      <div className="ModalAddCourses-wrapper">
        <Form
          form={form}
          layout="vertical"
          onValuesChange={(_, values): void => setFormValues({ ...formValues, ...values })}
        >
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Form.Item label="Khoá học" name="courses">
                <SelectMultiple
                  options={coursesOptions}
                  onSearch={handleSearchCourses}
                  onLoadMore={handleLoadMoreCourses}
                  disabled={Boolean(dataCourse)}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <HelpBadge
                type={EHelpBadgeType.WARNING}
                title={`Thao tác này sẽ thay đổi quyền truy cập khoá học của học viên “${data?.name}”. Tất cả dữ liệu khoá học của học viên vẫn được lưu lại khi thay đổi.`}
              />
            </Col>
          </Row>
        </Form>
      </div>
    </Modal>
  );
};

export default ModalAddCourses;
