import React, { useEffect, useState } from 'react';
import { SortableContainer, SortableElement, SortableHandle, arrayMove } from 'react-sortable-hoc';
import { Row, Col } from 'antd';
import _ from 'lodash';

import Icon, { EIconColor, EIconName } from '@/components/Icon';
import { TQuestion } from '@/common/models';
import Button, { EButtonStyleType } from '@/components/Button';
import Tooltip from '@/components/Tooltip';
import { ELessonArrange } from '@/common/enums';

import { TQuestionsSortableProps } from './QuestionsSortable.types';
import { useDispatch } from 'react-redux';
import { updateLessonQuestionsIndexAction } from '@/redux/actions';

const DragHandle = SortableHandle(() => (
  <div className="QuestionsSortable-item-holder">
    <Icon name={EIconName.GripVertical} color={EIconColor.PALE_SKY} />
  </div>
));

const SortableItem: any = SortableElement(
  ({
    data,
    showHandler,
    onDelete,
    onEdit,
  }: {
    data: TQuestion;
    showHandler?: boolean;
    onDelete?: () => void;
    onEdit?: () => void;
  }) => {
    return (
      <div className="QuestionsSortable-item">
        <Row gutter={[8, 8]} align="middle" wrap={false}>
          {showHandler && (
            <Col>
              <DragHandle />
            </Col>
          )}

          <Col flex={1}>
            <div
              className="QuestionsSortable-item-title ellipsis-1"
              dangerouslySetInnerHTML={{ __html: data?.question || '' }}
            />
          </Col>
          <Col>
            <Row gutter={[8, 8]} wrap={false}>
              <Col>
                <Tooltip title="Sửa câu hỏi">
                  <Button
                    iconName={EIconName.Pencil}
                    iconColor={EIconColor.SHARK}
                    size="small"
                    styleType={EButtonStyleType.OUTLINE_GEYSER}
                    onClick={onEdit}
                  />
                </Tooltip>
              </Col>
              <Col>
                <Tooltip title="Xoá câu hỏi">
                  <Button
                    iconName={EIconName.Trash}
                    iconColor={EIconColor.SHARK}
                    size="small"
                    styleType={EButtonStyleType.OUTLINE_GEYSER}
                    onClick={onDelete}
                  />
                </Tooltip>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  },
);

const SortableList: any = SortableContainer(
  ({
    data,
    showHandler,
    onItemDelete,
    onItemEdit,
  }: {
    data: TQuestion[];
    showHandler?: boolean;
    onItemDelete?: (data: TQuestion) => void;
    onItemEdit?: (data: TQuestion) => void;
  }) => {
    return (
      <div>
        {data?.map((item, index) => (
          <SortableItem
            key={item.id}
            index={index}
            data={item}
            showHandler={showHandler}
            onDelete={(): void => onItemDelete?.(item)}
            onEdit={(): void => onItemEdit?.(item)}
          />
        ))}
      </div>
    );
  },
);

const QuestionsSortable: React.FC<TQuestionsSortableProps> = ({ data, dataLesson, onItemDelete, onItemEdit }) => {
  const dispatch = useDispatch();
  const [sortableData, setSortableData] = useState<TQuestion[]>([]);
  const showHandler = dataLesson?.arrange === ELessonArrange.ORDER;

  const handleSortEnd = (e: any): void => {
    const newData = arrayMove(sortableData, e.oldIndex, e.newIndex);
    const newDataWithNewIndex = newData.map((item, index) => ({ ...item, index }));
    setSortableData(newDataWithNewIndex);

    if (dataLesson) {
      const body = {
        newIndex: newDataWithNewIndex.reduce((result, item) => {
          return {
            ...result,
            [item.id]: item.index,
          };
        }, {}),
      };

      dispatch(updateLessonQuestionsIndexAction.request({ paths: { id: dataLesson.id }, body }));
    }
  };

  useEffect(() => {
    if (data && data.length > 0) {
      setSortableData(_.orderBy(data, 'index', 'asc'));
    }
  }, [data]);

  return (
    <div className="QuestionsSortable">
      <SortableList
        useDragHandle
        showHandler={showHandler}
        data={sortableData}
        onSortEnd={handleSortEnd}
        onItemDelete={(dataQuestion: TQuestion): void => onItemDelete?.(dataQuestion)}
        onItemEdit={(dataQuestion: TQuestion): void => onItemEdit?.(dataQuestion)}
      />
    </div>
  );
};

export default QuestionsSortable;
