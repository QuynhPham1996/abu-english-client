import React, { useCallback, useState } from 'react';
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import Student from '@/layouts/Student';
import SEO from '@/components/SEO';
import Tabs from '@/components/Tabs';
import ProfileInformation from '@/containers/ProfileInformation';
import ProfileChangePassword from '@/containers/ProfileChangePassword';
import { TRootState } from '@/redux/reducers';
import { getFullPath, quickUploadImage, showNotification, validationRules } from '@/utils/functions';
import UploadImage from '@/components/UploadImage';
import { MAX_FILE_IMAGE_SIZE } from '@/common/constants';
import { ETypeNotification } from '@/common/enums';
import { EUpdateMyProfileAction, getMyProfileAction, updateMyProfileAction } from '@/redux/actions';
import { ServerProtectedRoute } from '@/utils/server-side';
import { GetServerSideProps } from 'next';

const Profile = () => {
  const dispatch = useDispatch();
  const myProfileState = useSelector((state: TRootState) => state.userReducer.getMyProfileResponse)?.data;

  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const updateMyProfileLoading = useSelector(
    (state: TRootState) => state.loadingReducer[EUpdateMyProfileAction.UPDATE_MY_PROFILE],
  );

  const loading = uploadLoading || updateMyProfileLoading;

  const dataProfileTabs = [
    {
      key: 'information',
      title: 'Thông tin cá nhân',
      children: (
        <div className="Profile-card">
          <ProfileInformation />
        </div>
      ),
    },
    {
      key: 'change-password',
      title: 'Đổi mật khẩu',
      children: <ProfileChangePassword />,
    },
  ];

  const handleChangeProfileAvatar = async (value: File): Promise<void> => {
    const isValidExt = ['image/png', 'image/jpeg', 'image/jpg'].includes(value?.type);
    const isValidSize = value.size <= MAX_FILE_IMAGE_SIZE;

    if (isValidExt && isValidSize) {
      setUploadLoading(true);
      const avatar = await quickUploadImage({ oldFilePath: myProfileState?.avatar, newFile: value });
      setUploadLoading(false);

      const body = { avatar };

      dispatch(updateMyProfileAction.request({ body }, handleSubmitSuccess));
    } else {
      showNotification(
        ETypeNotification.ERROR,
        'Vui lòng chọn ảnh có định dạng .png, .jpeg hoặc .jpg và kích thước <= 5MB !',
      );
    }
  };

  const getMyProfile = useCallback(() => {
    dispatch(getMyProfileAction.request({}));
  }, [dispatch]);

  const handleSubmitSuccess = (): void => {
    showNotification(ETypeNotification.SUCCESS, 'Cập nhật ảnh đại diện thành công.');
    getMyProfile();
  };

  return (
    <div className="Profile">
      <div className="Profile-wrapper">
        <div className="Profile-member">
          <Row gutter={[16, 16]} align="middle">
            <Col>
              <div className="Profile-member-avatar">
                <UploadImage
                  shape="circle"
                  avatar
                  removeBackground={false}
                  sizeImage={96}
                  value={getFullPath(myProfileState?.avatar)}
                  onChange={handleChangeProfileAvatar}
                  name={myProfileState?.name}
                  textSize="large"
                  avatarProps={{
                    name: myProfileState?.name,
                    size: 96,
                    image: getFullPath(myProfileState?.avatar),
                    textSize: 'large',
                  }}
                />

                {/* <Avatar
                  name={myProfileState?.name}
                  image={getFullPath(myProfileState?.avatar)}
                  textSize="large"
                  size={96}
                /> */}
              </div>
            </Col>
            <Col>
              <div className="Profile-member-info">
                <div className="Profile-member-info-title">{myProfileState?.name}</div>
                <div className="Profile-member-info-description">{myProfileState?.username}</div>
              </div>
            </Col>
          </Row>
        </div>

        <div className="Profile-main">
          <Tabs options={dataProfileTabs} />
        </div>
      </div>
    </div>
  );
};

export default Profile;

Profile.getLayout = function (page: React.ReactNode) {
  return (
    <>
      <SEO />
      <Student>{page}</Student>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => ServerProtectedRoute(context);
