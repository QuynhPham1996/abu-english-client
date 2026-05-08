import React from 'react';
import { Radio, RadioChangeEvent, Space } from 'antd';
import classNames from 'classnames';

import { TAnswerRadioProps } from './AnswerRadio.types.d';

const AnswerRadio: React.FC<TAnswerRadioProps> = ({ value, options = [], disabled, onChange }) => {
  const handleAnswerRadioChange = (e: RadioChangeEvent): void => {
    const { value: checkedValue } = e.target;
    const changedValue = options.find((option) => option.value === checkedValue);
    if (changedValue) {
      onChange?.(changedValue);
    }
  };

  return (
    <div className="AnswerRadio">
      <Radio.Group value={value?.value} onChange={handleAnswerRadioChange} disabled={disabled}>
        <Space direction="vertical" size={16}>
          {options.map((option) => (
            <Radio
              className={classNames('AnswerRadio-item', { correct: option.correct, incorrect: option.incorrect })}
              key={option.value}
              value={option.value}
            >
              <div dangerouslySetInnerHTML={{ __html: (option.label as any) || '' }} />
            </Radio>
          ))}
        </Space>
      </Radio.Group>
    </div>
  );
};

export default AnswerRadio;
