import { all, fork } from 'redux-saga/effects';

import authSaga from './auth';
import courseSaga from './course';
import exerciseSaga from './exercise';
import lessonSaga from './lesson';
import notificationSaga from './notification';
import publicSaga from './public';
import questionSaga from './question';
import testSaga from './test';
import userSaga from './user';
import questionGroupSaga from './question-group';
import questionBankSaga from './question-bank';
import assignmentSaga from './assignment';

const rootSaga = function* root(): Generator {
  yield all([
    fork(authSaga),
    fork(courseSaga),
    fork(exerciseSaga),
    fork(lessonSaga),
    fork(notificationSaga),
    fork(publicSaga),
    fork(questionSaga),
    fork(testSaga),
    fork(userSaga),
    fork(questionGroupSaga),
    fork(questionBankSaga),
    fork(assignmentSaga),
  ]);
};

export default rootSaga;
