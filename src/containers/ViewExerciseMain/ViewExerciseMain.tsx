import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Col, Progress, Row } from 'antd';
import { useSelector } from 'react-redux';

import DoExerciseCountdown from '@/containers/DoExerciseCountdown';
import Icon, { EIconColor, EIconName } from '@/components/Icon';
import Button, { EButtonStyleType } from '@/components/Button';
import AnswerRadio from '@/components/AnswerRadio';
import HelpBadge, { EHelpBadgeType } from '@/components/HelpBadge';
import { TRootState } from '@/redux/reducers';
import { ELessonType, ETestStatus, EUserRole } from '@/common/enums';
import CkEditor from '@/components/CkEditor';
import Tooltip from '@/components/Tooltip';
import ModalConfirmSubmitGraded from '@/containers/ModalConfirmSubmitGraded';
import { useModalState } from '@/utils/hooks';
import TextArea from '@/components/TextArea';

import { TDoExerciseData, TViewExerciseMainProps } from './ViewExerciseMain.types';

const ViewExerciseMain: React.FC<TViewExerciseMainProps> = () => {
  const myProfileState = useSelector((state: TRootState) => state.userReducer.getMyProfileResponse)?.data;
  const testState = useSelector((state: TRootState) => state.testReducer.getTestUserResponse);

  const isManager = [EUserRole.MANAGER, EUserRole.SUPER_ADMIN].includes(myProfileState?.role as EUserRole);
  const isAvailableGraded = isManager && testState?.data?.status === ETestStatus.PENDING;

  const [doExerciseState, setDoExerciseState] = useState<TDoExerciseData[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentDoExerciseState = doExerciseState?.[currentQuestionIndex];

  const totalQuestionsCorrect = doExerciseState.filter((item) => item?.isCorrect).length || 0;
  const totalQuestions = doExerciseState.length;
  const percentQuestionsCorrect = (totalQuestionsCorrect / totalQuestions) * 100;

  const isMultipleChoiceType = testState?.data?.lesson?.type === ELessonType.MULTIPLE_CHOICE;
  const isEssayType = testState?.data?.lesson?.type === ELessonType.ESSAY;

  const [confirmSubmitGradedModalState, handleOpenConfirmSubmitGraded, handleCloseConfirmSubmitGraded] =
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

  const handleGradedQuestion = (isCorrect: boolean): void => {
    const newData = doExerciseState.map((item) => {
      if (item?.id === currentDoExerciseState?.id) {
        return {
          ...item,
          isCorrect,
        };
      }
      return item;
    });

    setDoExerciseState(newData);
  };

  const handleChangeQuestionNote = (note: string): void => {
    const newData = doExerciseState.map((item) => {
      if (item?.id === currentDoExerciseState?.id) {
        return {
          ...item,
          note,
        };
      }
      return item;
    });

    setDoExerciseState(newData);
  };

  useEffect(() => {
    if (testState) {
      console.log(testState);
      const parseData: any = testState?.data?.userAnswers
        ?.map((userAnswer) => {
          const question = testState?.questions?.find((question) => question.id === userAnswer.question);
          if (question) {
            const userAnswerChoose = userAnswer?.answer;
            const correctAnswer = question?.answers?.find((answer) => answer.isCorrect);
            const isCorrectMultipleChoice = isMultipleChoiceType ? correctAnswer?.id === userAnswerChoose : undefined;
            const isCorrectEssay = isEssayType ? userAnswer?.isCorrect : undefined;

            const isCorrect = isCorrectMultipleChoice || isCorrectEssay;

            return {
              ...question,
              data: isMultipleChoiceType
                ? { value: userAnswer?.answer, label: userAnswer?.answer }
                : userAnswer?.answer,
              isCorrect,
              note: userAnswer?.note || question?.note,
              answers: question?.answers?.map((answer) => {
                return {
                  ...answer,
                  incorrect: answer.id === userAnswerChoose ? !isCorrect : undefined,
                  correct: answer.id === correctAnswer?.id,
                };
              }),
            };
          } else {
            return undefined;
          }
        })
        .filter((item) => item);

      setCurrentQuestionIndex(0);
      setDoExerciseState(parseData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testState]);

  return (
    <div className="ViewExerciseMain">
      <div className="DoExerciseMain-title">{testState?.data?.lesson?.name}</div>

      <div className="ViewExerciseMain-header flex items-center justify-between">
        <div className="ViewExerciseMain-header-item">
          <DoExerciseCountdown value={testState?.data?.duration} disabled />
          <Tooltip title={`Số câu hỏi ${isEssayType ? 'đạt' : 'làm đúng'}`} placement="right">
            <div className="ViewExerciseMain-header-info flex items-center">
              <Icon name={EIconName.FileCheck} color={EIconColor.SHARK} />
              <span>
                {totalQuestionsCorrect}/{totalQuestions}
              </span>
              <Progress
                percent={percentQuestionsCorrect}
                status="active"
                strokeColor={EIconColor.MOUNTAIN_MEADOW}
                showInfo={false}
              />
            </div>
          </Tooltip>
        </div>
        {isAvailableGraded && (
          <div className="ViewExerciseMain-header-item">
            <Button
              title="Hoàn Thành Chấm Bài"
              styleType={EButtonStyleType.PRIMARY}
              iconName={EIconName.Send}
              iconColor={EIconColor.WHITE}
              onClick={(): void =>
                handleOpenConfirmSubmitGraded({
                  testState,
                  doExerciseState,
                })
              }
            />
          </div>
        )}
        {testState?.data?.status === ETestStatus.SUCCESS && (
          <div className="ViewExerciseMain-header-item" style={{ transform: 'scale(1.5)', transformOrigin: 'right' }}>
            <Progress
              type="circle"
              percent={testState?.data?.result}
              width={48}
              strokeColor={EIconColor.GERALDINE}
              strokeWidth={8}
              format={(percent) => `${percent}%`}
            />
          </div>
        )}
      </div>

      <div className="ViewExerciseMain-body">
        <Row gutter={[48, 24]}>
          <Col span={24} lg={{ span: 18 }}>
            <div
              className="ViewExerciseMain-title"
              style={{ fontSize: '2rem', fontWeight: 600, marginBottom: '1.2rem' }}
              dangerouslySetInnerHTML={{
                __html: currentDoExerciseState?.question,
              }}
            />

            {isMultipleChoiceType && (
              <AnswerRadio
                value={currentDoExerciseState?.data}
                disabled
                options={
                  currentDoExerciseState?.answers?.map((item) => ({
                    ...item,
                    value: item.id,
                    label: item.title,
                    data: item,
                  })) || []
                }
              />
            )}

            {isEssayType && (
              <>
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
                  disabled
                />

                {isAvailableGraded && (
                  <div className="ViewExerciseMain-note" style={{ marginTop: '4.8rem' }}>
                    <h3 className="ViewExerciseMain-subtitle">Ghi chú</h3>
                    <TextArea value={currentDoExerciseState?.note} onChange={handleChangeQuestionNote} />
                  </div>
                )}
              </>
            )}

            {(!isManager || !isAvailableGraded) && currentDoExerciseState?.note && (
              <HelpBadge type={EHelpBadgeType.WARNING} iconName={EIconName.Help} title={currentDoExerciseState?.note} />
            )}

            <div className="ViewExerciseMain-actions flex items-center justify-between">
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
            <h3 className="ViewExerciseMain-subtitle">Câu hỏi</h3>
            <div className="ViewExerciseMain-questions">
              <Row gutter={[12, 12]}>
                {doExerciseState.map((item, index) => {
                  const isActive = index === currentQuestionIndex;
                  const isSuccess = typeof item?.isCorrect === 'boolean' && item?.isCorrect;
                  const isError = isAvailableGraded
                    ? typeof item?.isCorrect === 'boolean' && !item?.isCorrect
                    : !isSuccess;

                  return (
                    <Col key={item.id} span={6}>
                      <div
                        className={classNames('ViewExerciseMain-questions-item flex items-center justify-center', {
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

            {isMultipleChoiceType && (
              <div className="ViewExerciseMain-tooltips">
                <div className="ViewExerciseMain-tooltips-item flex items-center success">
                  <div className="ViewExerciseMain-tooltips-item-circle" />
                  Câu hỏi trả lời đúng
                </div>
                <div className="ViewExerciseMain-tooltips-item flex items-center error">
                  <div className="ViewExerciseMain-tooltips-item-circle" />
                  Câu hỏi trả lời sai
                </div>
              </div>
            )}

            {isEssayType && (
              <div className="ViewExerciseMain-tooltips">
                {isAvailableGraded && (
                  <div className="DoExerciseMain-tooltips-item flex items-center active">
                    <div className="DoExerciseMain-tooltips-item-circle" />
                    Câu hỏi hiện tại
                  </div>
                )}

                <div className="ViewExerciseMain-tooltips-item flex items-center success">
                  <div className="ViewExerciseMain-tooltips-item-circle" />
                  Câu hỏi đạt
                </div>
                <div className="ViewExerciseMain-tooltips-item flex items-center error">
                  <div className="ViewExerciseMain-tooltips-item-circle" />
                  Câu hỏi không đạt
                </div>
                {isAvailableGraded && (
                  <div className="ViewExerciseMain-tooltips-item flex items-center">
                    <div className="ViewExerciseMain-tooltips-item-circle" />
                    Câu hỏi chưa đánh giá
                  </div>
                )}
              </div>
            )}

            {isAvailableGraded && (
              <div className="ViewExerciseMain-graded" style={{ marginTop: '3.2rem' }}>
                <h3 className="ViewExerciseMain-subtitle">Đánh giá</h3>

                <Row gutter={[16, 16]}>
                  <Col>
                    <Button
                      className={classNames({
                        active:
                          typeof currentDoExerciseState?.isCorrect === 'boolean' && currentDoExerciseState?.isCorrect,
                      })}
                      iconName={EIconName.Check}
                      iconColor={EIconColor.MOUNTAIN_MEADOW}
                      styleType={EButtonStyleType.TRANSPARENT_SUCCESS}
                      onClick={(): void => handleGradedQuestion(true)}
                    />
                  </Col>
                  <Col>
                    <Button
                      className={classNames({
                        active:
                          typeof currentDoExerciseState?.isCorrect === 'boolean' && !currentDoExerciseState?.isCorrect,
                      })}
                      iconName={EIconName.X}
                      iconColor={EIconColor.ALIZARIN_CRIMSON}
                      styleType={EButtonStyleType.TRANSPARENT_DANGER}
                      onClick={(): void => handleGradedQuestion(false)}
                    />
                  </Col>
                </Row>
              </div>
            )}
          </Col>
        </Row>
      </div>

      <ModalConfirmSubmitGraded {...confirmSubmitGradedModalState} onClose={handleCloseConfirmSubmitGraded} />
    </div>
  );
};

export default ViewExerciseMain;
