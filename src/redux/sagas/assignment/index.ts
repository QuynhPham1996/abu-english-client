import { all, takeLatest } from 'redux-saga/effects';

import { getAssignmentsAction, getAssignmentAction, createAssignmentAction, updateAssignmentAction, deleteAssignmentsAction, addAssignmentQuestionsAction, addAssignmentGroupAction, updateAssignmentQuestionsIndexAction } from '@/redux/actions';

import { getAssignmentsSaga } from './get-assignments';
import { getAssignmentSaga } from './get-assignment';
import { createAssignmentSaga } from './create-assignment';
import { updateAssignmentSaga } from './update-assignment';
import { deleteAssignmentsSaga } from './delete-assignments';
import { addAssignmentQuestionsSaga } from './add-assignment-questions';
import { addAssignmentGroupSaga } from './add-assignment-group';
import { updateAssignmentQuestionsIndexSaga } from './update-assignment-questions-index';

export default function* root(): Generator {
  yield all([
    takeLatest(getAssignmentsAction.request.type, getAssignmentsSaga),
    takeLatest(getAssignmentAction.request.type, getAssignmentSaga),
    takeLatest(createAssignmentAction.request.type, createAssignmentSaga),
    takeLatest(updateAssignmentAction.request.type, updateAssignmentSaga),
    takeLatest(deleteAssignmentsAction.request.type, deleteAssignmentsSaga),
    takeLatest(addAssignmentQuestionsAction.request.type, addAssignmentQuestionsSaga),
    takeLatest(addAssignmentGroupAction.request.type, addAssignmentGroupSaga),
    takeLatest(updateAssignmentQuestionsIndexAction.request.type, updateAssignmentQuestionsIndexSaga),
  ]);
}
