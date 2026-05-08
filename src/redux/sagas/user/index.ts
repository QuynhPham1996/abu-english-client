import { all, takeLatest } from 'redux-saga/effects';

import {
  addUserCoursesAction,
  changeMyProfilePasswordAction,
  changeUserPasswordAction,
  createUserAction,
  deleteUsersAction,
  getMyProfileAction,
  getUsersAction,
  updateMyProfileAction,
  updateUserAction,
} from '@/redux/actions';

import { addUserCoursesSaga } from './add-user-courses';
import { changeMyProfilePasswordSaga } from './change-my-profile-password';
import { changeUserPasswordSaga } from './change-user-password';
import { createUserSaga } from './create-user';
import { deleteUsersSaga } from './delete-users';
import { getMyProfileSaga } from './get-my-profile';
import { getUsersSaga } from './get-users';
import { updateMyProfileSaga } from './update-my-profile';
import { updateUserSaga } from './update-user';

export default function* root(): Generator {
  yield all([
    takeLatest(addUserCoursesAction.request.type, addUserCoursesSaga),
    takeLatest(changeMyProfilePasswordAction.request.type, changeMyProfilePasswordSaga),
    takeLatest(changeUserPasswordAction.request.type, changeUserPasswordSaga),
    takeLatest(createUserAction.request.type, createUserSaga),
    takeLatest(deleteUsersAction.request.type, deleteUsersSaga),
    takeLatest(getMyProfileAction.request.type, getMyProfileSaga),
    takeLatest(getUsersAction.request.type, getUsersSaga),
    takeLatest(updateMyProfileAction.request.type, updateMyProfileSaga),
    takeLatest(updateUserAction.request.type, updateUserSaga),
  ]);
}
