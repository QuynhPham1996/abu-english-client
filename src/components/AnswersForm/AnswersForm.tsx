import React from 'react';
import { Col, Row } from 'antd';
import { v4 as uuidv4 } from 'uuid';

import Checkbox from '@/components/Checkbox';
import CkEditor from '@/components/CkEditor';
import Button, { EButtonStyleType } from '@/components/Button';
import { EIconColor, EIconName } from '@/components/Icon';
import { TAnswer } from '@/common/models';

import { TAnswersFormProps } from './AnswersForm.types.d';

const AnswersForm: React.FC<TAnswersFormProps> = ({ value, onChange }) => {
  const answers = Array.isArray(value) ? value.filter((item) => item?.id) : [];
  const handleSelectCorrectAnswer = (data: TAnswer, checked: boolean): void => {
    const newData = answers.map((item) => {
      if (item.id === data.id) {
        return {
          ...item,
          isCorrect: checked,
        };
      }

      return item;
    });

    onChange?.(newData);
  };

  const handleChangeTitleAnswer = (data: TAnswer, content?: string): void => {
    const newData = answers.map((item) => {
      if (item.id === data.id) {
        return {
          ...item,
          title: content || '',
        };
      }

      return item;
    });

    onChange?.(newData);
  };

  const handleDeleteAnswer = (data: TAnswer): void => {
    const newData = answers.filter((item) => item.id !== data.id);
    onChange?.(newData);
  };

  const handleAddAnswer = (): void => {
    const newData = [
      ...answers,
      {
        id: uuidv4(),
        title: '',
        isCorrect: false,
      },
    ];
    onChange?.(newData);
  };

  return (
    <div className="AnswersForm">
      <p className="AnswersForm-hint">Đánh dấu đáp án đúng. Có thể chọn nhiều hơn một.</p>
      <div className="AnswersForm-list">
        {answers.map((item) => {
          const isCorrect = item.isCorrect;
          const isAvailableDelete = answers.length > 2;

          return (
            <div key={item.id} className="AnswersForm-list-item">
              <Row gutter={[16, 16]} align="middle" wrap={false}>
                <Col>
                  <Checkbox
                    size="large"
                    value={isCorrect}
                    onChange={(checked): void => handleSelectCorrectAnswer(item, Boolean(checked))}
                  />
                </Col>
                <Col flex={1}>
                  <CkEditor
                    value={item.title}
                    toolbar={{ items: ['fontColor', '|', 'bold', 'italic', 'underline', '|', 'alignment'] }}
                    onChange={(data): void => handleChangeTitleAnswer(item, data)}
                  />
                </Col>
                <Col>
                  <Button
                    iconName={EIconName.Trash}
                    iconColor={EIconColor.SHARK}
                    styleType={EButtonStyleType.OUTLINE_GEYSER}
                    size="small"
                    disabled={!isAvailableDelete}
                    onClick={(): void => handleDeleteAnswer(item)}
                  />
                </Col>
              </Row>
            </div>
          );
        })}
      </div>

      <div className="AnswersForm-create flex justify-center">
        <Button
          title="Thêm câu trả lời"
          styleType={EButtonStyleType.OUTLINE_GEYSER}
          iconName={EIconName.Plus}
          iconColor={EIconColor.SHARK}
          onClick={handleAddAnswer}
        />
      </div>
    </div>
  );
};

export default AnswersForm;
