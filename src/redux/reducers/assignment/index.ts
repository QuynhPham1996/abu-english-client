import { createReducer } from 'deox';

import { TGetAssignmentsResponse, TGetAssignmentResponse, TCreateAssignmentResponse, TUpdateAssignmentResponse, TDeleteAssignmentsResponse, TAddAssignmentQuestionsResponse, TAddAssignmentGroupResponse, TUpdateAssignmentQuestionsIndexResponse } from '@/services/api/assignment';
import { getAssignmentsAction, getAssignmentAction, createAssignmentAction, updateAssignmentAction, deleteAssignmentsAction, addAssignmentQuestionsAction, addAssignmentGroupAction, updateAssignmentQuestionsIndexAction } from '@/redux/actions';
import { getAssignmentsUpdateState } from './get-assignments';
import { getAssignmentUpdateState } from './get-assignment';
import { createAssignmentUpdateState } from './create-assignment';
import { updateAssignmentUpdateState } from './update-assignment';
import { deleteAssignmentsUpdateState } from './delete-assignments';
import { addAssignmentQuestionsUpdateState } from './add-assignment-questions';
import { addAssignmentGroupUpdateState } from './add-assignment-group';
import { updateAssignmentQuestionsIndexUpdateState } from './update-assignment-questions-index';

export type TAssignmentState = {
  getAssignmentsResponse?: TGetAssignmentsResponse;
  getAssignmentResponse?: TGetAssignmentResponse;
  createAssignmentResponse?: TCreateAssignmentResponse;
  updateAssignmentResponse?: TUpdateAssignmentResponse;
  deleteAssignmentsResponse?: TDeleteAssignmentsResponse;
  addAssignmentQuestionsResponse?: TAddAssignmentQuestionsResponse;
  addAssignmentGroupResponse?: TAddAssignmentGroupResponse;
  updateAssignmentQuestionsIndexResponse?: TUpdateAssignmentQuestionsIndexResponse;
};

const initialState: TAssignmentState = {
  getAssignmentsResponse: undefined,
  getAssignmentResponse: undefined,
  createAssignmentResponse: undefined,
  updateAssignmentResponse: undefined,
  deleteAssignmentsResponse: undefined,
  addAssignmentQuestionsResponse: undefined,
  addAssignmentGroupResponse: undefined,
  updateAssignmentQuestionsIndexResponse: undefined,
};

const AssignmentReducer = createReducer(initialState, (handleAction) => [
  handleAction(getAssignmentsAction.success, getAssignmentsUpdateState),
  handleAction(getAssignmentAction.success, getAssignmentUpdateState),
  handleAction(createAssignmentAction.success, createAssignmentUpdateState),
  handleAction(updateAssignmentAction.success, updateAssignmentUpdateState),
  handleAction(deleteAssignmentsAction.success, deleteAssignmentsUpdateState),
  handleAction(addAssignmentQuestionsAction.success, addAssignmentQuestionsUpdateState),
  handleAction(addAssignmentGroupAction.success, addAssignmentGroupUpdateState),
  handleAction(updateAssignmentQuestionsIndexAction.success, updateAssignmentQuestionsIndexUpdateState),
]);

export default AssignmentReducer;
