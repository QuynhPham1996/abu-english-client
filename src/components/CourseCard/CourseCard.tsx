import React from 'react';
import Image from 'next/image';
import { Badge, Col, Row } from 'antd';

import Icon, { EIconColor, EIconName } from '@/components/Icon';
import Avatar from '@/components/Avatar';
import Tooltip from '@/components/Tooltip';
import Button, { EButtonStyleType } from '@/components/Button';
import { dataCourseLevelOptions, dataCourseStatusOptions } from '@/common/constants';
import { formatCurrency, formatVideoDuration, getFullPath } from '@/utils/functions';
import { ECourseStatus, EEmpty } from '@/common/enums';

import { TCourseCardProps } from './CourseCard.types.d';

const CourseCard: React.FC<TCourseCardProps> = ({
  name,
  level,
  sellingPrice = 0,
  retailPrice = 0,
  description,
  manager,
  status,
  image,
  totalExercises = 0,
  totalDurations = 0,
  totalUsers = 0,
  onRegister,
}) => {
  const isSale = retailPrice && retailPrice > 0;
  const salePercent = isSale ? Math.ceil(((retailPrice - sellingPrice) / retailPrice) * 100) : 0;

  const courseLevel = dataCourseLevelOptions.find((option) => option.value === level);
  const courseStatus = dataCourseStatusOptions.find((option) => option.value === status);

  return (
    <div className="CourseCard">
      <Badge.Ribbon
        text={courseStatus?.data?.text || courseStatus?.label}
        color={courseStatus?.data?.primaryColor}
        style={{
          color: courseStatus?.data?.color,
        }}
        placement="start"
      >
        <Badge.Ribbon
          text={`${salePercent}%`}
          color={EIconColor.ALIZARIN_CRIMSON}
          style={{
            color: EIconColor.WHITE,
            visibility: !!salePercent ? 'visible' : 'hidden',
          }}
        >
          <div className="CourseCard-wrapper">
            <div className="CourseCard-image">
              {image && <Image src={getFullPath(image) || ''} alt="" fill />}

              {courseLevel && (
                <div className="CourseCard-image-level flex items-center">
                  <Icon name={EIconName.AntennaBars} color={courseLevel?.data?.primaryColor} />
                  {courseLevel?.label}
                </div>
              )}
            </div>

            <div className="CourseCard-info">
              <h3 className="CourseCard-info-title">{name}</h3>
              <p className="CourseCard-info-description">{description}</p>

              <div className="CourseCard-info-teacher flex items-center">
                <Avatar size={32} name={manager?.name} image={getFullPath(manager?.avatar)} textSize="small" />
                Giảng Viên: {manager?.name}
              </div>

              <div className="CourseCard-info-detail">
                <Row wrap={false} justify="space-around">
                  <Col>
                    <Tooltip placement="top" title="Bài Học">
                      <div className="CourseCard-info-detail-item flex items-center">
                        <Icon name={EIconName.Book2} color={EIconColor.SHARK} />
                        {totalExercises || EEmpty.ZERO}
                      </div>
                    </Tooltip>
                  </Col>

                  <Col>
                    <Tooltip placement="top" title="Thời Lượng">
                      <div className="CourseCard-info-detail-item flex items-center">
                        <Icon name={EIconName.Clock} color={EIconColor.SHARK} />
                        {totalDurations ? formatVideoDuration(totalDurations) : EEmpty.DASH}
                      </div>
                    </Tooltip>
                  </Col>

                  <Col>
                    <Tooltip placement="top" title="Học Viên Đã Đăng Ký">
                      <div className="CourseCard-info-detail-item flex items-center">
                        <Icon name={EIconName.Users} color={EIconColor.SHARK} /> {/* {totalUsers || EEmpty.ZERO} */}
                        500+
                      </div>
                    </Tooltip>
                  </Col>
                </Row>
              </div>
            </div>

            <div className="CourseCard-price flex flex-col justify-center">
              {retailPrice ? (
                <>
                  <del className="CourseCard-price-retail">
                    <span>Giá niêm yết:</span> {formatCurrency(retailPrice, true)}
                  </del>
                  <div className="CourseCard-price-selling">
                    <span>Giá khuyến mãi:</span> {formatCurrency(sellingPrice, true)}
                  </div>
                </>
              ) : (
                <div className="CourseCard-price-selling">
                  <span>Giá bán:</span> {formatCurrency(sellingPrice, true)}
                </div>
              )}
            </div>

            <div className="CourseCard-register" style={{ marginTop: 'auto' }}>
              <Button
                title="Đăng ký ngay"
                styleType={EButtonStyleType.PRIMARY}
                onClick={onRegister}
                disabled={status !== ECourseStatus.PUBLIC}
              />
            </div>
          </div>
        </Badge.Ribbon>
      </Badge.Ribbon>
    </div>
  );
};

export default CourseCard;
