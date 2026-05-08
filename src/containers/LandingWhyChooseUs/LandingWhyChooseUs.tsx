import React from 'react';
import classNames from 'classnames';
import { Col, Row } from 'antd';
import Image from 'next/image';

import ImageWhyChooseUs1 from '@/assets/images/image-why-choose-us-1.png';
import ImageWhyChooseUs2 from '@/assets/images/image-why-choose-us-2.png';
import ImageWhyChooseUs3 from '@/assets/images/image-why-choose-us-3.png';
import ImageWhyChooseUs4 from '@/assets/images/image-why-choose-us-4.png';
import BgWhyChooseUs1 from '@/assets/images/bg-why-choose-us-1.svg';
import BgWhyChooseUs2 from '@/assets/images/bg-why-choose-us-2.svg';

import { TLandingWhyChooseUsProps } from './LandingWhyChooseUs.types.d';

const LandingWhyChooseUs: React.FC<TLandingWhyChooseUsProps> = () => {
  const dataWhyChooseUs = [
    {
      key: '1',
      subtitle: 'Các khóa học được xây dựng cho từng mục tiêu cụ thể',
      title: 'HỌC NHỮNG THỨ MÌNH CẦN',
      description:
        'Các khóa học được chia nhỏ lẻ theo các kỹ năng như Listen Grammar, Vocabulary,... giúp người học tiết kiệm thời gian và đầu tư chính xác vào kiến thức mong muốn, cải thiện kỹ năng còn thiếu và nhanh chóng áp dụng vào thực tế, nâng cao điểm số.',
      image: ImageWhyChooseUs1,
      maxWidth: '40rem',
      background: BgWhyChooseUs1,
    },
    {
      key: '2',
      subtitle: 'Hệ thống tự học Khoa học - Tự giác - Kỷ luật',
      title: 'THỰC HÀNH NGAY SAU KHI HỌC',
      description:
        'Với mỗi 1 bài học luôn đi kèm là 1 Video dạy lý thuyết và Bài tập trắc nghiệm, tự luận.. Học viên cần hoàn thành đầy đủ mới có thể sang các bài học tiếp theo nhằm tránh hổng kiến thức và đáp ứng được các tiêu chi để làm các bài khó hơn.',
      image: ImageWhyChooseUs2,
      background: undefined,
    },
    {
      key: '3',
      subtitle: 'Tự học chưa bao giờ dễ dàng đến thế!',
      title: 'HỆ THỐNG HỌC ĐA NỀN TẢNG',
      description:
        'Chỉ cần 1 chiếc điện thoại hay máy tính bảng, bạn có thể sẵn sàng cho việc học mọi lúc, mọi nơi hay bất cứ lúc nào bạn rảnh rỗi.',
      image: ImageWhyChooseUs3,
      background: undefined,
    },
    {
      key: '4',
      subtitle: 'Hãy tiếp tục cải thiện kết quả liên tục',
      title: 'TỰ ĐỘNG ĐÁNH GIÁ KẾT QUẢ',
      description:
        'Với bảng thống kê theo dõi tiến trình kết quả học tập, học viên sẽ tự biết được lộ trình học và các bài tập chưa đạt để cải thiện thời gian làm bài cũng như điểm số.',
      image: ImageWhyChooseUs4,
      background: BgWhyChooseUs2,
    },
  ];

  return (
    <section className="LandingWhyChooseUs" id="benefit">
      <div className="container">
        <div className="LandingWhyChooseUs-wrapper">
          <h2 className="LandingWhyChooseUs-title text-center">Vì sao bạn nên chọn học tại ABU English Club?</h2>
          <div className="LandingWhyChooseUs-main">
            {dataWhyChooseUs.map((item, index) => {
              const isEven = (index + 1) % 2 === 0;

              return (
                <div key={item.key} className={classNames('LandingWhyChooseUs-main-item', { reverse: isEven })}>
                  {item.background && (
                    <div className="LandingWhyChooseUs-main-item-background">
                      <Image src={item.background} alt="" />
                    </div>
                  )}
                  <Row gutter={[72, 72]} align="middle">
                    <Col span={24} lg={{ span: 12 }}>
                      <h4 className="LandingWhyChooseUs-main-item-subtitle">{item.subtitle}</h4>
                      <h3 className="LandingWhyChooseUs-main-item-title">{item.title}</h3>
                      <p className="LandingWhyChooseUs-main-item-description">{item.description}</p>
                    </Col>
                    <Col span={24} lg={{ span: 12 }}>
                      <div className="LandingWhyChooseUs-main-item-image" style={{ maxWidth: item.maxWidth }}>
                        <Image src={item.image} alt="" />
                      </div>
                    </Col>
                  </Row>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingWhyChooseUs;
