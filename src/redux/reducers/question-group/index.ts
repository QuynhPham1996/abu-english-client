import { createReducer } from 'deox';

import { TGetQuestionGroupsResponse, TGetQuestionGroupResponse, TCreateQuestionGroupResponse, TUpdateQuestionGroupResponse, TDeleteQuestionGroupsResponse } from '@/services/api/question-group';
import { getQuestionGroupsAction, getQuestionGroupAction, createQuestionGroupAction, updateQuestionGroupAction, deleteQuestionGroupsAction } from '@/redux/actions';
import { getQuestionGroupsUpdateState } from './get-question-groups';
import { getQuestionGroupUpdateState } from './get-question-group';
import { createQuestionGroupUpdateState } from './create-question-group';
import { updateQuestionGroupUpdateState } from './update-question-group';
import { deleteQuestionGroupsUpdateState } from './delete-question-groups';

export type TQuestionGroupState = {
  getQuestionGroupsResponse?: TGetQuestionGroupsResponse;
  getQuestionGroupResponse?: TGetQuestionGroupResponse;
  createQuestionGroupResponse?: TCreateQuestionGroupResponse;
  updateQuestionGroupResponse?: TUpdateQuestionGroupResponse;
  deleteQuestionGroupsResponse?: TDeleteQuestionGroupsResponse;
};

const initialState: TQuestionGroupState = {
  getQuestionGroupsResponse: undefined,
  getQuestionGroupResponse: undefined,
  createQuestionGroupResponse: undefined,
  updateQuestionGroupResponse: undefined,
  deleteQuestionGroupsResponse: undefined,
};

const QuestionGroupReducer = createReducer(initialState, (handleAction) => [
  handleAction(getQuestionGroupsAction.success, getQuestionGroupsUpdateState),
  handleAction(getQuestionGroupAction.success, getQuestionGroupUpdateState),
  handleAction(createQuestionGroupAction.success, createQuestionGroupUpdateState),
  handleAction(updateQuestionGroupAction.success, updateQuestionGroupUpdateState),
  handleAction(deleteQuestionGroupsAction.success, deleteQuestionGroupsUpdateState),
]);

export default QuestionGroupReducer;
