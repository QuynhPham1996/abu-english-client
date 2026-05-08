import React from 'react';
import { Col, Row } from 'antd';
import Image from 'next/image';

import ImageBanner from '@/assets/images/image-banner.png';
import Button, { EButtonStyleType } from '@/components/Button';
import { EIconColor, EIconName } from '@/components/Icon';

import { TLandingBannerProps } from './LandingBanner.types.d';

const LandingBanner: React.FC<TLandingBannerProps> = () => {
  return (
    <section className="LandingBanner">
      <div className="container">
        <div className="LandingBanner-wrapper">
          <Row gutter={[24, 24]}>
            <Col span={24} lg={{ span: 12 }}>
              <div className="LandingBanner-info">
                <h1 className="LandingBanner-info-title">Hệ thống tự học Tiếng Anh theo kỹ năng</h1>
                <p className="LandingBanner-info-description">
                  Hãy đặt mục tiêu 1 kỹ năng Tiếng Anh bạn muốn học. Bạn sẽ thấy sự tiến bộ rõ rệt khi kết hợp vừa học,
                  vừa làm bài tại hệ thống ABU chỉ với 15 phút cho mỗi bài học.
                </p>
                <div className="LandingBanner-info-btn flex">
                  <Button
                    title="Tìm hiểu các khóa học"
                    styleType={EButtonStyleType.WHITE}
                    iconColor={EIconColor.GERALDINE}
                    iconName={EIconName.Books}
                    size="large"
                    idTarget="#courses"
                    targetLink="_idTarget"
                  />
                </div>
              </div>
            </Col>
            <Col span={24} lg={{ span: 12 }}>
              <div className="LandingBanner-image">
                <Image src={ImageBanner} alt="" />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </section>
  );
};

export default LandingBanner;
