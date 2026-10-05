import React, { useEffect, useRef, useState } from 'react';
import { orderBy, shuffle } from 'lodash';

import { ELessonArrange, ELessonType } from '@/common/enums';
import { TQuestion } from '@/common/models';
import Loading from '@/components/Loading';
import Empty from '@/components/Empty';

import { TDoExerciseData, TLessonPreviewProps, TPreviewLesson } from './LessonPreview.types';

const stripHtml = (value?: string): string =>
  (value || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const stripAnswers = (question: TQuestion) => ({
  ...question,
  answers: question.answers?.map((answer) => ({
    id: answer.id,
    title: answer.title,
    isCorrect: false,
  })),
});

const prepareQuestions = (lesson?: TPreviewLesson): TDoExerciseData[] => {
  const questions = orderBy(lesson?.questions || [], 'index', 'asc').map((question) => ({
    ...stripAnswers(question),
    children: orderBy(question.children || [], 'index', 'asc').map((child) => stripAnswers(child)),
  }));

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
  const isEssayQuestion = (question?: TDoExerciseData): boolean =>
    (question?.type || lesson?.type) === ELessonType.ESSAY;

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
              <div dangerouslySetInnerHTML={{ __html: currentQuestion?.question || '' }} />
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
                      <h3>
                        {childIndex + 1}. {stripHtml(child.question) || `Câu hỏi con ${childIndex + 1}`}
                      </h3>
                      {isEssayQuestion(child) ? (
                        <textarea
                          value={child.data || ''}
                          placeholder="Nhập câu trả lời"
                          onChange={(event): void => updateChildAnswer(childIndex, event.target.value)}
                        />
                      ) : (
                        <div className="LessonPreview-options">
                          {child.answers?.map((answer) => (
                            <label key={answer.id} className={child.data === answer.id ? 'is-selected' : undefined}>
                              <input
                                type="radio"
                                name={`preview-child-${child.id || childIndex}`}
                                checked={child.data === answer.id}
                                onChange={(): void => updateChildAnswer(childIndex, answer.id)}
                              />
                              <span>{answer.title}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </article>
                  ))}
                </>
              ) : (
                <>
                  <h2>{isEssayQuestion(currentQuestion) ? 'TỰ LUẬN' : 'TRẮC NGHIỆM'}</h2>
                  <p>{isEssayQuestion(currentQuestion) ? 'Viết câu trả lời.' : 'Chọn một đáp án.'}</p>
                  {isEssayQuestion(currentQuestion) ? (
                    <textarea
                      value={currentQuestion?.data || ''}
                      placeholder="Nhập câu trả lời"
                      onChange={(event): void => updateAnswer(event.target.value)}
                    />
                  ) : (
                    <div className="LessonPreview-options">
                      {currentQuestion?.answers?.map((answer) => (
                        <label key={answer.id} className={currentQuestion.data === answer.id ? 'is-selected' : undefined}>
                          <input
                            type="radio"
                            name={`preview-question-${currentQuestion.id || currentIndex}`}
                            checked={currentQuestion.data === answer.id}
                            onChange={(): void => updateAnswer(answer.id)}
                          />
                          <span>{answer.title}</span>
                        </label>
                      ))}
                    </div>
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
