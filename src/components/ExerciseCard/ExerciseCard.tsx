import React from 'react';
import classNames from 'classnames';
import { Progress } from 'antd';

import Icon, { EIconColor, EIconName } from '@/components/Icon';
import Tag, { ETagType } from '@/components/Tag';
import Tooltip from '@/components/Tooltip';

import { TExerciseCardProps } from './ExerciseCard.types.d';

const ExerciseCard: React.FC<TExerciseCardProps> = ({
  locked,
  numberIndex,
  active,
  badgeTitle,
  name,
  description,
  percent = 0,
  onClick,
}) => {
  const completed = percent === 100;

  return (
    <div
      className={classNames('ExerciseCard', {
        disabled: locked,
        completed,
        active,
      })}
      onClick={onClick}
    >
      <Tooltip placement="top" title={locked ? 'Bạn cần phải hoàn thành bài học trước đó để mở khoá bài học này.' : ''}>
        <div className="ExerciseCard-wrapper flex items-center">
          <div className="ExerciseCard-circle flex items-center justify-center">
            <Progress
              type="circle"
              strokeWidth={6}
              strokeColor={completed ? EIconColor.WHITE : EIconColor.GERALDINE}
              percent={percent}
              format={() => (locked ? '' : numberIndex)}
            />
            {locked && (
              <div className="ExerciseCard-circle-lock flex">
                <Icon name={EIconName.Lock} color={EIconColor.WHITE} />
              </div>
            )}
            {completed && (
              <div className="ExerciseCard-circle-check flex">
                <Icon name={EIconName.Check} color={EIconColor.WHITE} />
              </div>
            )}
          </div>
          <div className="ExerciseCard-info">
            <h3 className="ExerciseCard-info-title flex items-center">
              <span>{name}</span>
              {badgeTitle && <Tag title="Học ngay" type={ETagType.WARNING} size="small" />}
            </h3>
            <p className="ExerciseCard-info-description ellipsis-2">{description}</p>
          </div>
        </div>
      </Tooltip>
    </div>
  );
};

export default ExerciseCard;
