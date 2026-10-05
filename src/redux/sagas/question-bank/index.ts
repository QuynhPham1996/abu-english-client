import { all, takeLatest } from 'redux-saga/effects';

import { getQuestionBankAction, getQuestionBankItemAction, createQuestionBankAction, updateQuestionBankAction, deleteQuestionBankAction } from '@/redux/actions';

import { getQuestionBankSaga } from './get-question-bank';
import { getQuestionBankItemSaga } from './get-question-bank-item';
import { createQuestionBankSaga } from './create-question-bank';
import { updateQuestionBankSaga } from './update-question-bank';
import { deleteQuestionBankSaga } from './delete-question-bank';

export default function* root(): Generator {
  yield all([
    takeLatest(getQuestionBankAction.request.type, getQuestionBankSaga),
    takeLatest(getQuestionBankItemAction.request.type, getQuestionBankItemSaga),
    takeLatest(createQuestionBankAction.request.type, createQuestionBankSaga),
    takeLatest(updateQuestionBankAction.request.type, updateQuestionBankSaga),
    takeLatest(deleteQuestionBankAction.request.type, deleteQuestionBankSaga),
  ]);
}
