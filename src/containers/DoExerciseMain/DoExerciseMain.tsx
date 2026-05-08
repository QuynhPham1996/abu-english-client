import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Col, Progress, Row } from 'antd';
import { useSelector } from 'react-redux';

import DoExerciseCountdown from '@/containers/DoExerciseCountdown';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import Button, { EButtonStyleType } from '@/components/Button';
import AnswerRadio from '@/components/AnswerRadio';
import { TRootState } from '@/redux/reducers';
import ModalConfirmSubmitExercise from '@/containers/ModalConfirmSubmitExercise';
import { useModalState, useWarnIfUnsavedChanges } from '@/utils/hooks';
import { ELessonType } from '@/common/enums';
import Tooltip from '@/components/Tooltip';
import TextArea from '@/components/TextArea';

import { TDoExerciseData, TDoExerciseMainProps } from './DoExerciseMain.types.d';

const DoExerciseMain: React.FC<TDoExerciseMainProps> = () => {
  const myCourseLessonState = useSelector((state: TRootState) => state.courseReducer.getMyCourseLessonResponse)?.data;
  const userExerciseId = useSelector((state: TRootState) => state.courseReducer.getMyCourseLessonResponse)?.userExercise
    ?.id;

  const [timer, setTimer] = useState<number>(0);
  const [doExerciseState, setDoExerciseState] = useState<TDoExerciseData[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentDoExerciseState = doExerciseState?.[currentQuestionIndex];

  const totalQuestionsSelected = doExerciseState.filter((item) => item.data).length || 0;
  const totalQuestions = doExerciseState.length;
  const percentQuestionsSelected = (totalQuestionsSelected / totalQuestions) * 100;

  const isMultipleChoiceType = myCourseLessonState?.lesson?.type === ELessonType.MULTIPLE_CHOICE;
  const isEssayType = myCourseLessonState?.lesson?.type === ELessonType.ESSAY;

  const [confirmSubmitExerciseModalState, handleOpenConfirmSubmitExercise, handleCloseConfirmSubmitExercise] =
    useModalState();

  const handlePrevQuestion = (): void => {
    if (currentQuestionIndex > 0) setCurrentQuestionIndex(currentQuestionIndex - 1);
  };

  const handleNextQuestion = (): void => {
    if (currentQuestionIndex < totalQuestions - 1) setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleClickQuestion = (index: number): void => {
    setCurrentQuestionIndex(index);
  };

  const handleChangeAnswer = (data: any): void => {
    const newData = doExerciseState.map((item, index) => {
      if (index === currentQuestionIndex) {
        return {
          ...item,
          data,
        };
      }

      return item;
    });

    setDoExerciseState(newData);
  };

  useEffect(() => {
    if (myCourseLessonState) {
      setCurrentQuestionIndex(0);
      setDoExerciseState(myCourseLessonState?.lesson?.questions || []);
    }
  }, [myCourseLessonState]);

  useWarnIfUnsavedChanges(!confirmSubmitExerciseModalState?.visible, () => {
    return confirm(
      'Bạn có chắc chắn muốn thoát bài tập kiểm tra lần này không? Quá trình làm bài sẽ không được lưu lại.',
    );
  });

  return (
    <div className="DoExerciseMain">
      <div className="DoExerciseMain-title">{myCourseLessonState?.lesson?.name}</div>
      <div className="DoExerciseMain-header flex items-center justify-between">
        <div className="DoExerciseMain-header-item">
          <DoExerciseCountdown onChange={setTimer} />
          <Tooltip title="Số câu đã làm" placement="right">
            <div className="DoExerciseMain-header-info flex items-center">
              <Icon name={EIconName.ClipboardText} color={EIconColor.SHARK} />
              <span>
                {totalQuestionsSelected}/{totalQuestions}
              </span>
              <Progress
                percent={percentQuestionsSelected}
                status="active"
                strokeColor={EIconColor.MOUNTAIN_MEADOW}
                showInfo={false}
              />
            </div>
          </Tooltip>
        </div>
        <div className="DoExerciseMain-header-item">
          <Button
            title="Nộp Bài"
            styleType={EButtonStyleType.PRIMARY}
            iconName={EIconName.Send}
            iconColor={EIconColor.WHITE}
            onClick={(): void =>
              handleOpenConfirmSubmitExercise({
                userLessonId: myCourseLessonState?.id,
                userExerciseId,
                lessonId: myCourseLessonState?.lesson?.id,
                timer,
                doExerciseState,
              })
            }
          />
        </div>
      </div>

      <div className="DoExerciseMain-body">
        <Row gutter={[48, 24]}>
          <Col span={24} lg={{ span: 18 }}>
            <div
              className="DoExerciseMain-title"
              style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '1.2rem' }}
              dangerouslySetInnerHTML={{
                __html: currentDoExerciseState?.question,
              }}
            />

            {isMultipleChoiceType && (
              <AnswerRadio
                value={currentDoExerciseState?.data}
                onChange={handleChangeAnswer}
                options={
                  currentDoExerciseState?.answers?.map((item) => ({
                    value: item.id,
                    label: item.title,
                    data: item,
                    incorrect: undefined,
                    correct: undefined,
                  })) || []
                }
              />
            )}

            {/* {isEssayType && (
              <CkEditor
                toolbar={{
                  items: [
                    'heading',
                    '|',
                    'fontColor',
                    '|',
                    'bold',
                    'italic',
                    'underline',
                    'strikethrough',
                    '|',
                    'superscript',
                    'subscript',
                    '|',
                    'alignment',
                    'outdent',
                    'indent',
                    '|',
                    'bulletedList',
                    'numberedList',
                    '|',
                    'undo',
                    'redo',
                  ],
                }}
                value={currentDoExerciseState?.data}
                onChange={handleChangeAnswer}
              />
            )} */}

            {isEssayType && <TextArea value={currentDoExerciseState?.data} onChange={handleChangeAnswer} />}

            <div className="DoExerciseMain-actions flex items-center justify-between">
              <div>
                {currentQuestionIndex > 0 && (
                  <Button title="Quay lại" styleType={EButtonStyleType.OUTLINE_GEYSER} onClick={handlePrevQuestion} />
                )}
              </div>
              <div>
                {currentQuestionIndex < totalQuestions - 1 && (
                  <Button
                    title="Tiếp theo"
                    styleType={EButtonStyleType.TRANSPARENT_GEYSER}
                    onClick={handleNextQuestion}
                  />
                )}
              </div>
            </div>
          </Col>
          <Col span={24} lg={{ span: 6 }}>
            <h3 className="DoExerciseMain-subtitle">Câu hỏi</h3>
            <div className="DoExerciseMain-questions">
              <Row gutter={[12, 12]}>
                {doExerciseState.map((item, index) => {
                  const isActive = index === currentQuestionIndex;
                  const isSuccess = item?.data;
                  const isError = false;

                  return (
                    <Col key={item.id} span={6}>
                      <div
                        className={classNames('DoExerciseMain-questions-item flex items-center justify-center', {
                          active: isActive,
                          success: isSuccess,
                          error: isError,
                        })}
                        onClick={(): void => handleClickQuestion(index)}
                      >
                        {index + 1}
                      </div>
                    </Col>
                  );
                })}
              </Row>
            </div>
            <div className="DoExerciseMain-tooltips">
              <div className="DoExerciseMain-tooltips-item flex items-center active">
                <div className="DoExerciseMain-tooltips-item-circle" />
                Câu hỏi hiện tại
              </div>
              <div className="DoExerciseMain-tooltips-item flex items-center success">
                <div className="DoExerciseMain-tooltips-item-circle" />
                Câu hỏi đã trả lời
              </div>
              <div className="DoExerciseMain-tooltips-item flex items-center">
                <div className="DoExerciseMain-tooltips-item-circle" />
                Câu hỏi chưa trả lời
              </div>
            </div>
          </Col>
        </Row>
      </div>

      <ModalConfirmSubmitExercise {...confirmSubmitExerciseModalState} onClose={handleCloseConfirmSubmitExercise} />
    </div>
  );
};

export default DoExerciseMain;
