import { all, takeLatest } from 'redux-saga/effects';

import { createQuestionAction, deleteQuestionsAction, updateQuestionAction } from '@/redux/actions';

import { createQuestionSaga } from './create-question';
import { deleteQuestionsSaga } from './delete-questions';
import { updateQuestionSaga } from './update-question';

export default function* root(): Generator {
  yield all([
    takeLatest(createQuestionAction.request.type, createQuestionSaga),
    takeLatest(deleteQuestionsAction.request.type, deleteQuestionsSaga),
    takeLatest(updateQuestionAction.request.type, updateQuestionSaga),
  ]);
}
