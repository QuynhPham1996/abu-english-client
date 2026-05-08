import { createReducer } from 'deox';

import { TCreateQuestionResponse, TDeleteQuestionsResponse, TUpdateQuestionResponse } from '@/services/api/question';
import { createQuestionAction, deleteQuestionsAction, updateQuestionAction } from '@/redux/actions';
import { createQuestionUpdateState } from './create-question';
import { deleteQuestionsUpdateState } from './delete-questions';
import { updateQuestionUpdateState } from './update-question';

export type TQuestionState = {
  createQuestionResponse?: TCreateQuestionResponse;
  deleteQuestionsResponse?: TDeleteQuestionsResponse;
  updateQuestionResponse?: TUpdateQuestionResponse;
};

const initialState: TQuestionState = {
  createQuestionResponse: undefined,
  deleteQuestionsResponse: undefined,
  updateQuestionResponse: undefined,
};

const QuestionReducer = createReducer(initialState, (handleAction) => [
  handleAction(createQuestionAction.success, createQuestionUpdateState),
  handleAction(deleteQuestionsAction.success, deleteQuestionsUpdateState),
  handleAction(updateQuestionAction.success, updateQuestionUpdateState),
]);

export default QuestionReducer;
