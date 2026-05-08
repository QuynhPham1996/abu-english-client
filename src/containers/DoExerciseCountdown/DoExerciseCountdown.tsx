import React, { useEffect, useState } from 'react';
import { Progress } from 'antd';
import moment from 'moment';

import Icon, { EIconName, EIconColor } from '@/components/Icon';
import { addZeroIfLessThanTen } from '@/utils/functions';

import { TDoExerciseCountdownProps } from './DoExerciseCountdown.types';
import Tooltip from '@/components/Tooltip';

const DoExerciseCountdown: React.FC<TDoExerciseCountdownProps> = ({ value = 0, disabled, onChange }) => {
  const maxRangeTimer = 60 * 60;

  const [timer, setTimer] = useState<number>(value);

  const duration = moment.duration(timer, 'seconds');
  const minutes = addZeroIfLessThanTen(Math.floor(duration.asMinutes()));
  const seconds = addZeroIfLessThanTen(Math.floor(duration.seconds()));
  const format = `${minutes}:${seconds}`;

  const percent = ((timer >= maxRangeTimer ? maxRangeTimer : timer) / maxRangeTimer) * 100;

  useEffect(() => {
    if (!disabled) {
      const interval = setInterval(() => {
        setTimer((oldTimer) => oldTimer + 1);
      }, 1000);

      return (): void => {
        clearInterval(interval);
      };
    }
  }, [disabled]);

  useEffect(() => {
    onChange?.(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);

  return (
    <Tooltip title="Thời gian làm bài" placement="right">
      <div className="DoExerciseMain-header-info flex items-center">
        <Icon name={EIconName.Alarm} color={EIconColor.SHARK} />
        <span>{format}</span>
        <Progress percent={percent} status="active" strokeColor={EIconColor.MOUNTAIN_MEADOW} showInfo={false} />
      </div>
    </Tooltip>
  );
};

export default DoExerciseCountdown;
