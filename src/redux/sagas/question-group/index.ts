import { all, takeLatest } from 'redux-saga/effects';

import { getQuestionGroupsAction, getQuestionGroupAction, createQuestionGroupAction, updateQuestionGroupAction, deleteQuestionGroupsAction } from '@/redux/actions';

import { getQuestionGroupsSaga } from './get-question-groups';
import { getQuestionGroupSaga } from './get-question-group';
import { createQuestionGroupSaga } from './create-question-group';
import { updateQuestionGroupSaga } from './update-question-group';
import { deleteQuestionGroupsSaga } from './delete-question-groups';

export default function* root(): Generator {
  yield all([
    takeLatest(getQuestionGroupsAction.request.type, getQuestionGroupsSaga),
    takeLatest(getQuestionGroupAction.request.type, getQuestionGroupSaga),
    takeLatest(createQuestionGroupAction.request.type, createQuestionGroupSaga),
    takeLatest(updateQuestionGroupAction.request.type, updateQuestionGroupSaga),
    takeLatest(deleteQuestionGroupsAction.request.type, deleteQuestionGroupsSaga),
  ]);
}
