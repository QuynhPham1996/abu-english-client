import { all, takeLatest } from 'redux-saga/effects';

import { getPublicCoursesAction, sendContactAction } from '@/redux/actions';

import { getPublicCoursesSaga } from './get-public-courses';
import { sendContactSaga } from './send-contact';

export default function* root(): Generator {
  yield all([
    takeLatest(getPublicCoursesAction.request.type, getPublicCoursesSaga),
    takeLatest(sendContactAction.request.type, sendContactSaga),
  ]);
}
