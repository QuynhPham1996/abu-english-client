import React, { useEffect, useRef, useState } from 'react';
import { orderBy, shuffle } from 'lodash';

import { ELessonArrange, ELessonType } from '@/common/enums';
import { TQuestion } from '@/common/models';
import Loading from '@/components/Loading';
import Empty from '@/components/Empty';
import { formatQuestionHtml } from '@/utils/question';

import { TDoExerciseData, TLessonPreviewProps, TPreviewLesson } from './LessonPreview.types';

const stripAnswers = (question: TQuestion): TDoExerciseData => ({
  ...question,
  multiple: Boolean(question.multiple) || (question.answers?.filter((answer) => answer.isCorrect).length || 0) > 1,
  answers: question.answers?.map((answer) => ({
    id: answer.id,
    title: answer.title,
    isCorrect: false,
  })),
  children: orderBy(question.children || [], 'index', 'asc').map((child) => stripAnswers(child)),
});

const prepareQuestions = (lesson?: TPreviewLesson): TDoExerciseData[] => {
  const questions = orderBy(lesson?.questions || [], 'index', 'asc').map((question) => stripAnswers(question));

  if (lesson?.arrange === ELessonArrange.RANDOM) return shuffle(questions);
  return questions;
};

const isQuestionAnswered = (question?: TDoExerciseData): boolean => {
  if (!question) return false;
  if (question.children?.length) return question.children.every((child) => Boolean(child.data));
  return Boolean(question.data);
};

const flattenAnswers = (items: TDoExerciseData[]): TDoExerciseData[] =>
  items.flatMap((item) => (item.children?.length ? item.children : [item]));

const LessonPreview: React.FC<TLessonPreviewProps> = ({
  title,
  lessons = [],
  lessonId,
  loading,
  preview = true,
  onChangeLesson,
  onSubmit,
}) => {
  const splitRef = useRef<HTMLDivElement>(null);
  const [leftWidth, setLeftWidth] = useState(54);
  const [questions, setQuestions] = useState<TDoExerciseData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [duration, setDuration] = useState(0);
  const lesson = lessons.find((item) => item.id === lessonId) || lessons[0];
  const currentQuestion = questions[currentIndex];
  const questionType = (question?: TDoExerciseData): string | undefined => question?.type || lesson?.type;

  const renderResponse = (
    question: TDoExerciseData | undefined,
    value: string | undefined,
    onValue: (next?: string) => void,
    inputName: string,
  ): React.ReactNode => {
    const type = questionType(question);
    if (type === ELessonType.ESSAY) {
      return (
        <textarea
          value={value || ''}
          placeholder="Nhập câu trả lời"
          onChange={(event): void => onValue(event.target.value)}
        />
      );
    }
    if (type === ELessonType.FILL_BLANK) {
      return (
        <input
          className="LessonPreview-fill"
          value={value || ''}
          placeholder="Nhập 1–2 từ"
          onChange={(event): void => onValue(event.target.value)}
        />
      );
    }

    const chosen = new Set((value || '').split(',').filter(Boolean));
    return (
      <div className="LessonPreview-options">
        {question?.answers?.map((answer) => (
          <label key={answer.id} className={chosen.has(answer.id) ? 'is-selected' : undefined}>
            <input
              type={question?.multiple ? 'checkbox' : 'radio'}
              name={inputName}
              checked={chosen.has(answer.id)}
              onChange={(): void => {
                if (!question?.multiple) {
                  onValue(answer.id);
                  return;
                }
                const next = new Set(chosen);
                if (next.has(answer.id)) next.delete(answer.id);
                else next.add(answer.id);
                onValue(Array.from(next).join(','));
              }}
            />
            <div dangerouslySetInnerHTML={{ __html: formatQuestionHtml(answer.title) }} />
          </label>
        ))}
      </div>
    );
  };

  const responseHeading = (question?: TDoExerciseData): { title: string; hint: string } => {
    const type = questionType(question);
    if (type === ELessonType.ESSAY) return { title: 'TỰ LUẬN', hint: 'Viết câu trả lời.' };
    if (type === ELessonType.FILL_BLANK) return { title: 'ĐIỀN TỪ', hint: 'Nhập 1–2 từ.' };
    if (question?.multiple) return { title: 'TRẮC NGHIỆM', hint: 'Chọn tất cả đáp án đúng.' };
    return { title: 'TRẮC NGHIỆM', hint: 'Chọn một đáp án.' };
  };

  useEffect(() => {
    setQuestions(prepareQuestions(lesson));
    setCurrentIndex(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lesson?.id]);

  useEffect(() => {
    if (preview) return undefined;
    const timerId = window.setInterval(() => setDuration((value) => value + 1), 1000);
    return () => window.clearInterval(timerId);
  }, [preview]);

  const updateAnswer = (value?: string): void => {
    setQuestions((prev) => prev.map((item, index) => (index === currentIndex ? { ...item, data: value } : item)));
  };

  const updateChildAnswer = (childIndex: number, value?: string): void => {
    setQuestions((prev) =>
      prev.map((item, index) => {
        if (index !== currentIndex) return item;
        return {
          ...item,
          children: item.children?.map((child, childPosition) =>
            childPosition === childIndex ? { ...child, data: value } : child,
          ),
        };
      }),
    );
  };

  const focusQuestion = (index: number): void => {
    if (index < 0 || index >= questions.length) return;
    setCurrentIndex(index);
  };

  const startResize = (event: React.PointerEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    const move = (pointerEvent: PointerEvent): void => {
      const rect = splitRef.current?.getBoundingClientRect();
      if (!rect?.width) return;
      const next = ((pointerEvent.clientX - rect.left) / rect.width) * 100;
      setLeftWidth(Math.min(72, Math.max(28, next)));
    };
    const stop = (): void => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', stop);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', stop);
  };

  return (
    <div className="LessonPreview">
      <header className="LessonPreview-header">
        <div>
          <h1>{lesson?.name || title || 'Xem trước bài tập'}</h1>
          <p>
            Đọc nội dung và trả lời câu hỏi 1–{questions.length || 0}.
            {preview ? ' Đây là bản xem trước, bài làm không được lưu.' : ''}
          </p>
        </div>
        {lessons.length > 1 && (
          <label className="LessonPreview-switch">
            Bài tập
            <select value={lesson?.id || ''} onChange={(event): void => onChangeLesson?.(event.target.value)}>
              {lessons.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>
        )}
      </header>

      {loading ? (
        <div className="LessonPreview-state">
          <Loading />
        </div>
      ) : !lesson || questions.length === 0 ? (
        <div className="LessonPreview-state">
          <Empty />
        </div>
      ) : (
        <div className="LessonPreview-split" ref={splitRef}>
          <section className="LessonPreview-pane" style={{ width: `${leftWidth}%` }}>
            <div className="LessonPreview-passage">
              <h2>Câu {currentIndex + 1}</h2>
              <div dangerouslySetInnerHTML={{ __html: formatQuestionHtml(currentQuestion?.question) }} />
            </div>
          </section>

          <button type="button" className="LessonPreview-handle" aria-label="Kéo để đổi độ rộng" onPointerDown={startResize}>
            <span />
          </button>

          <section className="LessonPreview-pane LessonPreview-pane-answers">
            <div className="LessonPreview-sheet">
              {currentQuestion?.children?.length ? (
                <>
                  <h2>CÂU HỎI CON</h2>
                  <p>Trả lời các câu hỏi của câu {currentIndex + 1}.</p>
                  {currentQuestion.children.map((child, childIndex) => (
                    <article key={child.id || childIndex}>
                      <div className="LessonPreview-prompt">
                        <strong>{childIndex + 1}.</strong>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: formatQuestionHtml(child.question) || `Câu hỏi con ${childIndex + 1}`,
                          }}
                        />
                      </div>
                      {renderResponse(
                        child,
                        child.data,
                        (next): void => updateChildAnswer(childIndex, next),
                        `preview-child-${child.id || childIndex}`,
                      )}
                    </article>
                  ))}
                </>
              ) : (
                <>
                  <h2>{responseHeading(currentQuestion).title}</h2>
                  <p>{responseHeading(currentQuestion).hint}</p>
                  {renderResponse(
                    currentQuestion,
                    currentQuestion?.data,
                    updateAnswer,
                    `preview-question-${currentQuestion?.id || currentIndex}`,
                  )}
                </>
              )}
            </div>
          </section>
        </div>
      )}

      <footer className="LessonPreview-footer">
        <div className="LessonPreview-numbers">
          {questions.map((question, index) => (
            <button
              key={question.id || index}
              type="button"
              className={[index === currentIndex ? 'is-current' : '', isQuestionAnswered(question) ? 'is-answered' : '']
                .filter(Boolean)
                .join(' ')}
              onClick={(): void => focusQuestion(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <div className="LessonPreview-actions">
          <button type="button" disabled={currentIndex <= 0} onClick={(): void => focusQuestion(currentIndex - 1)}>
            ←
          </button>
          <button
            type="button"
            disabled={currentIndex >= questions.length - 1}
            onClick={(): void => focusQuestion(currentIndex + 1)}
          >
            →
          </button>
          <button
            type="button"
            className="is-submit"
            disabled={preview}
            onClick={(): void => onSubmit?.(flattenAnswers(questions), duration)}
          >
            Nộp bài
          </button>
        </div>
      </footer>
    </div>
  );
};

export default LessonPreview;
