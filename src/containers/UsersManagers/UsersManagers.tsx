import React, { useCallback } from 'react';
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

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
import Select from '@/components/Select';
import { EGetUsersAction, getMyProfileAction, getUsersAction } from '@/redux/actions';
import { TUser } from '@/common/models';
import { dataUserStatusOptions, DEFAULT_PAGE } from '@/common/constants';
import { getFullPath } from '@/utils/functions';
import ModalChangeUserPassword from '@/containers/ModalChangeUserPassword';
import { TRootState } from '@/redux/reducers';

import { TUsersManagersProps } from './UsersManagers.types';

const UsersManagers: React.FC<TUsersManagersProps> = () => {
  const dispatch = useDispatch();
  const [deleteUserModalState, handleOpenDeleteUserModal, handleCloseDeleteUserModal] = useModalState();
  const [userFormModalState, handleOpenUserFormModal, handleCloseUserFormModal] = useModalState();
  const [changeUserPasswordModalState, handleOpenChangeUserPasswordModal, handleCloseChangeUserPasswordModal] =
    useModalState();

  const myProfileState = useSelector((state: TRootState) => state.userReducer.getMyProfileResponse)?.data;

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
      role: EUserRole.MANAGER,
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
      key: 'actions',
      dataIndex: 'actions',
      title: 'Thao tác',
      width: 40,
      fixed: 'right',
      render: (_: string, record: TUser): React.ReactElement => (
        <div onClick={(e): void => e.stopPropagation()}>
          <Row gutter={[8, 8]} wrap={false}>
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
              <Tooltip title="Sửa quản trị viên">
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
              <Tooltip title="Xoá quản trị viên">
                <Button
                  iconName={EIconName.Trash}
                  iconColor={EIconColor.SHARK}
                  size="small"
                  styleType={EButtonStyleType.OUTLINE_GEYSER}
                  onClick={(): void => handleOpenDeleteUserModal(record)}
                  disabled={record.id === myProfileState?.id}
                />
              </Tooltip>
            </Col>
          </Row>
        </div>
      ),
    },
  ];

  const getMyProfile = useCallback(() => {
    dispatch(getMyProfileAction.request({}));
  }, [dispatch]);

  return (
    <div className="UsersManagers">
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
                        title="Tạo mới Quản trị viên"
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
                    Tổng Quản Trị Viên: <strong>{usersState?.paginate?.total || EEmpty.ZERO}</strong>
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
        role={EUserRole.MANAGER}
        onClose={handleCloseUserFormModal}
        onSuccess={(): void => {
          getUsers();
          const isUpdateSelf = userFormModalState?.data?.id === myProfileState?.id;
          if (isUpdateSelf) {
            getMyProfile();
          }
        }}
      />
      <ModalDeleteUser {...deleteUserModalState} onClose={handleCloseDeleteUserModal} onSuccess={getUsers} />
      <ModalChangeUserPassword {...changeUserPasswordModalState} onClose={handleCloseChangeUserPasswordModal} />
    </div>
  );
};

export default UsersManagers;
