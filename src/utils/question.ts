import { TAnswer } from '@/common/models';

const HTML_TAG = /<\/?[a-z][\s\S]*>/i;

export const questionHasHtml = (value?: string): boolean => HTML_TAG.test(value || '');

export const formatQuestionHtml = (value?: string): string => {
  if (!value) return '';
  if (questionHasHtml(value)) return value;

  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '<br />');
};

export const normalizeFillAnswer = (value?: string): string =>
  (value || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/[“”"'‘’]/g, '')
    .replace(/[.,!?;:]+$/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();

export const isFillAnswerCorrect = (given?: string, accepted: Partial<TAnswer>[] = []): boolean => {
  const normalized = normalizeFillAnswer(given);
  if (!normalized) return false;

  return accepted.some(
    (answer) => answer.isCorrect !== false && normalizeFillAnswer(answer.title) === normalized,
  );
};

export const isChoiceAnswerCorrect = (given?: string, answers: Partial<TAnswer>[] = []): boolean => {
  const correctIds = answers
    .filter((answer) => answer.isCorrect && answer.id)
    .map((answer) => answer.id as string)
    .sort();
  const chosen = String(given || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
    .sort();

  return (
    correctIds.length > 0 &&
    correctIds.length === chosen.length &&
    correctIds.every((id, index) => id === chosen[index])
  );
};
