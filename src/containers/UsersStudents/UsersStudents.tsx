import React from 'react';
import { Col, Row } from 'antd';

import Table from '@/components/Table';
import Avatar from '@/components/Avatar';
import Tag, { ETagType } from '@/components/Tag';
import Tooltip from '@/components/Tooltip';
import Button, { EButtonStyleType } from '@/components/Button';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import { EEmpty, EUserRole } from '@/common/enums';
import ModalDeleteUser from '@/containers/ModalDeleteUser';
import { useModalState, usePaginationTool } from '@/utils/hooks';
import ModalUserForm from '@/containers/ModalUserForm';
import Input from '@/components/Input';
import ModalAddCourses from '@/containers/ModalAddCourses';
import Select from '@/components/Select';
import { EGetUsersAction, getUsersAction } from '@/redux/actions';
import { DEFAULT_PAGE, dataProcessOptions, dataUserStatusOptions } from '@/common/constants';
import { TUser } from '@/common/models';
import { caculateProcessPercent, getFullPath, truncateStringByCharaters } from '@/utils/functions';
import ModalSendNotification from '@/containers/ModalSendNotification';
import ModalChangeUserPassword from '@/containers/ModalChangeUserPassword';

import { TUsersStudentsProps } from './UsersStudents.types';

const UsersStudents: React.FC<TUsersStudentsProps> = () => {
  const [deleteUserModalState, handleOpenDeleteUserModal, handleCloseDeleteUserModal] = useModalState();
  const [userFormModalState, handleOpenUserFormModal, handleCloseUserFormModal] = useModalState();
  const [addCoursesModalState, handleOpenAddCoursesModal, handleCloseAddCoursesModal] = useModalState();
  const [sendNotificationModalState, handleOpenSendNotificationModal, handleCloseSendNotificationModal] =
    useModalState();
  const [changeUserPasswordModalState, handleOpenChangeUserPasswordModal, handleCloseChangeUserPasswordModal] =
    useModalState();

  const {
    paramsRequest: getUsersParamsRequest,
    setParamsRequest: setGetUsersParamsRequest,
    loading: getUsersLoading,
    state: usersState,
    getData: getUsers,
    handlePaginationChange: handlePaginationUsersChange,
    handleSearch: handleSearchUsers,
  } = usePaginationTool({
    initialParams: {
      role: EUserRole.STUDENT,
    },
    action: getUsersAction,
    reducer: 'userReducer',
    response: 'getUsersResponse',
    loadingAction: EGetUsersAction.GET_USERS,
  });

  const columns = [
    {
      key: 'avatar',
      dataIndex: 'avatar',
      title: '',
      width: 36,
      render: (_: string, record: TUser): React.ReactElement => (
        <div className="Table-image">
          <Avatar size={36} name={record?.name} image={getFullPath(record?.avatar)} textSize="small" />
        </div>
      ),
    },
    {
      key: 'name',
      dataIndex: 'name',
      title: 'Họ và tên',
      className: 'limit-width',
      sorter: true,
      keySort: 'name',
      render: (_: string, record: TUser): React.ReactElement => (
        <div className="Table-info">
          <div className="Table-info-title">{record?.name}</div>
          <div className="Table-info-description small">{record?.username}</div>
        </div>
      ),
    },
    {
      key: 'email',
      dataIndex: 'email',
      title: 'Email',
      sorter: true,
      keySort: 'email',
      render: (_: string, record: TUser): React.ReactElement =>
        record?.email ? (
          <Tag
            iconName={EIconName.Mail}
            iconColor={EIconColor.SHARK}
            title={record?.email}
            size="small"
            type={ETagType.GENERAL}
          />
        ) : (
          <>{EEmpty.DASH}</>
        ),
    },
    {
      key: 'phoneNumber',
      dataIndex: 'phoneNumber',
      title: 'Số điện thoại',
      sorter: true,
      keySort: 'phoneNumber',
      className: 'nowrap',
      render: (_: string, record: TUser): React.ReactElement =>
        record?.phoneNumber ? (
          <Tag
            iconName={EIconName.Mail}
            iconColor={EIconColor.SHARK}
            title={record?.phoneNumber}
            size="small"
            type={ETagType.GENERAL}
          />
        ) : (
          <>{EEmpty.DASH}</>
        ),
    },
    {
      key: 'status',
      dataIndex: 'status',
      title: 'Trạng thái',
      sorter: true,
      keySort: 'status',
      render: (_: string, record: TUser): React.ReactElement => {
        const status = dataUserStatusOptions.find((option) => option.value === record?.status);

        return (
          <Tag
            iconName={EIconName.BrandRedux}
            iconColor={status?.data?.color}
            title={status?.label}
            size="small"
            type={status?.data?.tagType}
          />
        );
      },
    },
    {
      key: 'coureses',
      dataIndex: 'coureses',
      title: 'Khoá học',
      render: (_: string, record: TUser): React.ReactElement => {
        const isEmpty = record.courses?.length === 0;

        return isEmpty ? (
          <>{EEmpty.DASH}</>
        ) : (
          <Row gutter={[8, 8]}>
            {record.courses.map((item) => {
              const lessons = record?.userLessons?.filter(
                (subItem) => subItem?.lesson?.exercise?.course?.id === item.id,
              );
              const exercises = record?.userExercises?.filter((subItem) => subItem?.exercise?.course?.id === item.id);

              const totalExercises = Number(exercises?.length || EEmpty.ZERO);
              const totalExercisesCompleted = Number(
                exercises?.filter((subItem) => subItem.isPass)?.length || EEmpty.ZERO,
              );

              const totalLessons = Number(lessons?.length || EEmpty.ZERO);
              const totalLessonsCompleted = Number(lessons?.filter((subItem) => subItem.isPass)?.length || EEmpty.ZERO);

              const percent = caculateProcessPercent({
                totalExercises,
                totalExercisesCompleted,
                totalLessons,
                totalLessonsCompleted,
              });

              const currentProcess = dataProcessOptions.find((option) => percent >= option.data.percent);

              return (
                <Col key={item.id} span={24}>
                  <Row gutter={[8, 8]} wrap={false} align="middle">
                    <Col>
                      <Tooltip title={item.name}>
                        <Tag
                          iconName={EIconName.Books}
                          iconColor={EIconColor.SHARK}
                          title={truncateStringByCharaters(item.name, 10)}
                          size="small"
                          type={ETagType.GENERAL}
                        />
                      </Tooltip>
                    </Col>
                    <Col>
                      <Tag
                        iconName={EIconName.Book2}
                        iconColor={EIconColor.SHARK}
                        title={`Bài tập: ${totalLessonsCompleted}/${totalLessons}`}
                        size="small"
                        type={ETagType.GENERAL}
                      />
                    </Col>
                    <Col>
                      <Tag
                        iconName={EIconName.AntennaBars}
                        iconColor={currentProcess?.data?.color}
                        title={`Tiến độ: ${percent}%`}
                        size="small"
                        type={currentProcess?.data?.tagType}
                      />
                    </Col>
                  </Row>
                </Col>
              );
            })}
          </Row>
        );
      },
    },
    {
      key: 'actions',
      dataIndex: 'actions',
      title: 'Thao tác',
      width: 40,
      fixed: 'right',
      render: (_: string, record: TUser): React.ReactElement => (
        <div onClick={(e): void => e.stopPropagation()}>
          <Row gutter={[8, 8]} wrap={false}>
            <Col>
              <Tooltip title="Thêm khoá học">
                <Button
                  iconName={EIconName.Book2}
                  iconColor={EIconColor.SHARK}
                  size="small"
                  styleType={EButtonStyleType.OUTLINE_GEYSER}
                  onClick={(): void => handleOpenAddCoursesModal(record)}
                />
              </Tooltip>
            </Col>
            <Col>
              <Tooltip title="Thông báo cho học viên">
                <Button
                  iconName={EIconName.BellBolt}
                  iconColor={EIconColor.SHARK}
                  size="small"
                  styleType={EButtonStyleType.OUTLINE_GEYSER}
                  onClick={(): void => handleOpenSendNotificationModal(record)}
                />
              </Tooltip>
            </Col>
            <Col>
              <Tooltip title="Đổi mật khẩu">
                <Button
                  iconName={EIconName.Lock}
                  iconColor={EIconColor.SHARK}
                  size="small"
                  styleType={EButtonStyleType.OUTLINE_GEYSER}
                  onClick={(): void => handleOpenChangeUserPasswordModal(record)}
                />
              </Tooltip>
            </Col>
            <Col>
              <Tooltip title="Sửa học viên">
                <Button
                  iconName={EIconName.Pencil}
                  iconColor={EIconColor.SHARK}
                  size="small"
                  styleType={EButtonStyleType.OUTLINE_GEYSER}
                  onClick={(): void => handleOpenUserFormModal(record)}
                />
              </Tooltip>
            </Col>
            <Col>
              <Tooltip title="Xoá học viên">
                <Button
                  iconName={EIconName.Trash}
                  iconColor={EIconColor.SHARK}
                  size="small"
                  styleType={EButtonStyleType.OUTLINE_GEYSER}
                  onClick={(): void => handleOpenDeleteUserModal(record)}
                />
              </Tooltip>
            </Col>
          </Row>
        </div>
      ),
    },
  ];

  return (
    <div className="UsersStudents">
      <Table
        header={
          <Row gutter={[16, 16]} justify="space-between" align="middle">
            <Col span={24}>
              <Row gutter={[16, 16]} justify="space-between" align="middle">
                <Col>
                  <Row gutter={[16, 16]} align="middle">
                    <Col>
                      <Input
                        placeholder="Tìm kiếm"
                        suffix={<Icon name={EIconName.Search} color={EIconColor.SHARK} />}
                        onSearch={handleSearchUsers}
                      />
                    </Col>
                    <Col>
                      <Select
                        placeholder="Trạng thái"
                        allowClear
                        options={dataUserStatusOptions}
                        onChange={(option): void => {
                          setGetUsersParamsRequest({
                            ...getUsersParamsRequest,
                            page: DEFAULT_PAGE,
                            status: option?.value,
                          });
                        }}
                      />
                    </Col>
                  </Row>
                </Col>

                <Col>
                  <Row gutter={[16, 16]}>
                    <Col>
                      <Button
                        title="Tạo mới Học viên"
                        iconName={EIconName.Plus}
                        iconColor={EIconColor.WHITE}
                        styleType={EButtonStyleType.PRIMARY}
                        onClick={handleOpenUserFormModal}
                      />
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row gutter={[16, 16]} align="middle">
                <Col>
                  <div className="Table-total-item">
                    <Icon name={EIconName.Users} color={EIconColor.SHARK} />
                    Tổng Học Viên: <strong>{usersState?.paginate?.total || EEmpty.ZERO}</strong>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        }
        columns={columns}
        loading={getUsersLoading}
        dataSources={usersState?.data}
        page={getUsersParamsRequest?.page}
        pageSize={getUsersParamsRequest?.pageSize}
        total={usersState?.paginate?.total}
        onPaginationChange={handlePaginationUsersChange}
      />

      <ModalUserForm
        {...userFormModalState}
        role={EUserRole.STUDENT}
        onClose={handleCloseUserFormModal}
        onSuccess={getUsers}
      />
      <ModalAddCourses {...addCoursesModalState} onClose={handleCloseAddCoursesModal} onSuccess={getUsers} />
      <ModalDeleteUser {...deleteUserModalState} onClose={handleCloseDeleteUserModal} onSuccess={getUsers} />
      <ModalSendNotification {...sendNotificationModalState} onClose={handleCloseSendNotificationModal} />
      <ModalChangeUserPassword {...changeUserPasswordModalState} onClose={handleCloseChangeUserPasswordModal} />
    </div>
  );
};

export default UsersStudents;
