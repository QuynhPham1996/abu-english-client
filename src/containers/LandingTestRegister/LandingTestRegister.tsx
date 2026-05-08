import React from 'react';
import { Rate } from 'antd';
import Image from 'next/image';

import Button, { EButtonStyleType } from '@/components/Button';
import LogoIelts from '@/assets/images/logo-ielts.png';
import LogoToeic from '@/assets/images/logo-toeic.png';
import LogoEts from '@/assets/images/logo-ets.png';
import ImageTestRegister from '@/assets/images/image-test-register.png';

import { TLandingTestRegisterProps } from './LandingTestRegister.types.d';

const LandingTestRegister: React.FC<TLandingTestRegisterProps> = () => {
  return (
    <section className="LandingTestRegister">
      <div className="LandingTestRegister-wrapper">
        <h2 className="LandingTestRegister-title text-center">Làm bài Test để tìm ra khóa học phù hợp nhất</h2>

        <div className="LandingTestRegister-main">
          {[1].map((item) => (
            <div key={item} className="LandingTestRegister-card flex items-center">
              <div className="LandingTestRegister-card-image">
                <Image src={ImageTestRegister} alt="" />
              </div>
              <div className="LandingTestRegister-card-info">
                <h3 className="LandingTestRegister-card-info-title">
                  Kiểm tra nhanh năng lực Tiếng Anh của bản thân để tìm ra kỹ năng còn thiếu. Căn cứ vào kết quả, hệ
                  thống sẽ đề xuất khóa học phù hợp với bạn nhất
                </h3>
                {/* <div className="LandingTestRegister-card-info-rating flex items-center">
                  <Rate value={4.5} disabled /> (80)
                </div> */}
                <div className="LandingTestRegister-card-info-btn flex">
                  <Button
                    title="Đăng ký ngay"
                    size="large"
                    styleType={EButtonStyleType.WHITE}
                    idTarget="#contact"
                    targetLink="_idTarget"
                  />
                </div>
                {/* <div className="LandingTestRegister-card-info-logo flex items-center flex-wrap">
                  <div className="LandingTestRegister-card-info-logo-item">
                    <Image src={LogoIelts} alt="" />
                  </div>
                  <div className="LandingTestRegister-card-info-logo-item">
                    <Image src={LogoEts} alt="" />
                  </div>
                  <div className="LandingTestRegister-card-info-logo-item">
                    <Image src={LogoToeic} alt="" />
                  </div>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingTestRegister;
