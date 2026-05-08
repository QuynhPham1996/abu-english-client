import React from 'react';
import classNames from 'classnames';

import Icon, { EIconColor, EIconName } from '@/components/Icon';
import { dataLessonTypeOptions } from '@/common/constants';
import Tag, { ETagType } from '@/components/Tag';
import Button, { EButtonStyleType } from '@/components/Button';

import { TLessonCardProps } from './LessonCard.types.d';

const LessonCard: React.FC<TLessonCardProps> = ({ name, type, completed, description, onClick }) => {
  const typeArrange = dataLessonTypeOptions.find((option) => option.value === type);

  return (
    <div className={classNames('LessonCard', { completed })} onClick={onClick}>
      <div className="LessonCard-wrapper flex items-center">
        {completed && (
          <div className="LessonCard-check flex">
            <Icon name={EIconName.Check} color={EIconColor.WHITE} />
          </div>
        )}
        <div className="LessonCard-info">
          <h3 className="LessonCard-info-title flex items-center">
            <span>{name}</span>
            <Tag
              title={typeArrange?.label}
              iconName={typeArrange?.data?.iconName}
              iconColor={EIconColor.SHARK}
              type={ETagType.GENERAL}
              size="small"
            />
          </h3>
          <p className="LessonCard-info-description ellipsis-2">{description}</p>
        </div>
        <div className="LessonCard-btn">
          <Button
            iconName={EIconName.AngleRight}
            iconColor={EIconColor.SHARK}
            styleType={EButtonStyleType.OUTLINE_GEYSER}
          />
        </div>
      </div>
    </div>
  );
};

export default LessonCard;
