import React from 'react';
import { Col, Collapse, CollapsePanelProps, CollapseProps, Row } from 'antd';
import { useMediaQuery } from 'react-responsive';

import Icon, { EIconColor, EIconName } from '@/components/Icon';
import Button, { EButtonStyleType } from '@/components/Button';
import DropdownMenu from '@/components/DropdownMenu';
import Tag, { ETagType } from '@/components/Tag';
import { dataLessonArrangeOptions, dataLessonStatusOptions, dataLessonTypeOptions } from '@/common/constants';
import Empty from '@/components/Empty';
import Tooltip from '@/components/Tooltip';
import { TQuestion } from '@/common/models';
import { EEmpty } from '@/common/enums';
import QuestionsSortable from '@/containers/ExercisesManagementCollapse/QuestionsSortable/QuestionsSortable';

import { TExercisesManagementCollapseProps } from './ExercisesManagementCollapse.types.d';

const { Panel } = Collapse;

const CollapseModify: React.FC<CollapseProps & { children?: React.ReactNode }> = Collapse;
const PanelModify: React.FC<CollapsePanelProps & { children?: React.ReactNode }> = Panel;

const ExercisesManagementCollapse: React.FC<TExercisesManagementCollapseProps> = ({
  data = [],
  onItemDelete,
  onItemEdit,
  onItemCreate,
  onPickBankQuestions,
  onPickQuestionGroup,
  onGroupItemEdit,
  onGroupItemDelete,
  onPreview,
}) => {
  const isMobile = useMediaQuery({ maxWidth: 575 });

  return (
    <div className="ExercisesManagementCollapse">
      <CollapseModify
        expandIconPosition="right"
        expandIcon={(): React.ReactNode => <Icon name={EIconName.AngleDown} color={EIconColor.SHARK} />}
      >
        {data.map((item) => {
          const lessonStatus = dataLessonStatusOptions.find((option) => option.value === item.status);
          const lessonType = dataLessonTypeOptions.find((option) => option.value === item.type);
          const lessonArrange = dataLessonArrangeOptions.find((option) => option.value === item.arrange);
          const isEmpty = item?.questions?.length === 0;

          return (
            <PanelModify
              className="ExercisesManagementCollapse-item"
              key={item.id}
              header={
                <div className="ExercisesManagementCollapse-header">
                  <Row gutter={[8, 8]} style={{ marginBottom: '.8rem' }}>
                    <Col>
                      <Tag
                        type={lessonStatus?.data?.tagType}
                        title={lessonStatus?.label}
                        size="small"
                        iconName={EIconName.BrandRedux}
                        iconColor={lessonStatus?.data?.color}
                      />
                    </Col>
                    <Col>
                      <Tag
                        type={ETagType.GENERAL}
                        title={lessonType?.label}
                        iconName={lessonType?.data?.iconName}
                        size="small"
                      />
                    </Col>
                    {lessonArrange && (
                      <Col>
                        <Tag
                          type={ETagType.GENERAL}
                          title={lessonArrange?.label}
                          size="small"
                          iconName={lessonArrange?.data?.iconName}
                          iconColor={EIconColor.SHARK}
                        />
                      </Col>
                    )}
                    {item.sourceAssignment && (
                      <Col>
                        <Tag
                          type={ETagType.GENERAL}
                          title="Từ thư viện"
                          size="small"
                          iconName={EIconName.ClipboardText}
                          iconColor={EIconColor.SHARK}
                        />
                      </Col>
                    )}
                  </Row>
                  <Row gutter={[16, 16]} align="middle" justify="space-between" wrap={false}>
                    <Col>
                      <Row gutter={[8, 8]}>
                        <Col>
                          <div
                            className="ExercisesManagementCollapse-header-title flex"
                            style={{ columnGap: '0.4rem' }}
                          >
                            <span className="ellipsis-1">{item?.name}</span> ({item?.questions?.length || EEmpty.ZERO})
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    <Col onClick={(e): void => e.stopPropagation()}>
                      <Row gutter={[8, 8]} wrap={false}>
                        {(onItemCreate || onPickBankQuestions || onPickQuestionGroup) && (
                          <Col>
                            <DropdownMenu
                              placement="bottomRight"
                              options={[
                                {
                                  value: 'create',
                                  label: 'Tạo câu hỏi mới',
                                  icon: EIconName.Plus,
                                  hide: !onItemCreate,
                                  onClick: (): void => onItemCreate?.(undefined, { dataLesson: item }),
                                },
                                {
                                  value: 'bank',
                                  label: 'Chọn câu hỏi có sẵn',
                                  icon: EIconName.Help,
                                  hide: !onPickBankQuestions,
                                  onClick: (): void => onPickBankQuestions?.(item),
                                },
                                {
                                  value: 'group',
                                  label: 'Chọn nhóm câu hỏi',
                                  icon: EIconName.UsersGroup,
                                  hide: !onPickQuestionGroup,
                                  onClick: (): void => onPickQuestionGroup?.(item),
                                },
                              ]}
                            >
                              <Button
                                title={isMobile ? undefined : 'Thêm câu'}
                                styleType={EButtonStyleType.OUTLINE_GEYSER}
                                iconName={EIconName.Plus}
                                iconColor={EIconColor.SHARK}
                                size="small"
                              />
                            </DropdownMenu>
                          </Col>
                        )}
                        <Col>
                          <Tooltip title="Xem trước">
                            <Button
                              styleType={EButtonStyleType.OUTLINE_GEYSER}
                              iconName={EIconName.Eye}
                              iconColor={EIconColor.SHARK}
                              size="small"
                              onClick={(): void => onPreview?.(item)}
                            />
                          </Tooltip>
                        </Col>
                        <Col>
                          <Tooltip title="Sửa bài tập">
                            <Button
                              styleType={EButtonStyleType.OUTLINE_GEYSER}
                              iconName={EIconName.Pencil}
                              iconColor={EIconColor.SHARK}
                              size="small"
                              onClick={(): void => onGroupItemEdit?.(item)}
                            />
                          </Tooltip>
                        </Col>
                        <Col>
                          <Tooltip title="Xoá bài tập">
                            <Button
                              styleType={EButtonStyleType.OUTLINE_GEYSER}
                              iconName={EIconName.Trash}
                              iconColor={EIconColor.SHARK}
                              size="small"
                              onClick={(): void => onGroupItemDelete?.(item)}
                            />
                          </Tooltip>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
              }
            >
              <div className="ExercisesManagementCollapse-body">
                {isEmpty ? (
                  <Empty />
                ) : (
                  <QuestionsSortable
                    dataLesson={item}
                    data={item.questions}
                    onItemDelete={(dataQuestion: TQuestion): void => onItemDelete?.(dataQuestion, { dataLesson: item })}
                    onItemEdit={(dataQuestion: TQuestion): void => onItemEdit?.(dataQuestion, { dataLesson: item })}
                  />
                )}
              </div>
            </PanelModify>
          );
        })}
      </CollapseModify>
    </div>
  );
};

export default ExercisesManagementCollapse;
