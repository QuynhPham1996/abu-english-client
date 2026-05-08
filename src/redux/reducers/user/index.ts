import { createReducer } from 'deox';

import {
  TAddUserCoursesResponse,
  TChangeMyProfilePasswordResponse,
  TChangeUserPasswordResponse,
  TCreateUserResponse,
  TDeleteUsersResponse,
  TGetMyProfileResponse,
  TGetUsersResponse,
  TUpdateMyProfileResponse,
  TUpdateUserResponse,
} from '@/services/api/user';
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
import { addUserCoursesUpdateState } from './add-user-courses';
import { changeMyProfilePasswordUpdateState } from './change-my-profile-password';
import { changeUserPasswordUpdateState } from './change-user-password';
import { createUserUpdateState } from './create-user';
import { deleteUsersUpdateState } from './delete-users';
import { getMyProfileUpdateState } from './get-my-profile';
import { getUsersUpdateState } from './get-users';
import { updateMyProfileUpdateState } from './update-my-profile';
import { updateUserUpdateState } from './update-user';

export type TUserState = {
  addUserCoursesResponse?: TAddUserCoursesResponse;
  changeMyProfilePasswordResponse?: TChangeMyProfilePasswordResponse;
  changeUserPasswordResponse?: TChangeUserPasswordResponse;
  createUserResponse?: TCreateUserResponse;
  deleteUsersResponse?: TDeleteUsersResponse;
  getMyProfileResponse?: TGetMyProfileResponse;
  getUsersResponse?: TGetUsersResponse;
  updateMyProfileResponse?: TUpdateMyProfileResponse;
  updateUserResponse?: TUpdateUserResponse;
};

const initialState: TUserState = {
  addUserCoursesResponse: undefined,
  changeMyProfilePasswordResponse: undefined,
  changeUserPasswordResponse: undefined,
  createUserResponse: undefined,
  deleteUsersResponse: undefined,
  getMyProfileResponse: undefined,
  getUsersResponse: undefined,
  updateMyProfileResponse: undefined,
  updateUserResponse: undefined,
};

const UserReducer = createReducer(initialState, (handleAction) => [
  handleAction(addUserCoursesAction.success, addUserCoursesUpdateState),
  handleAction(changeMyProfilePasswordAction.success, changeMyProfilePasswordUpdateState),
  handleAction(changeUserPasswordAction.success, changeUserPasswordUpdateState),
  handleAction(createUserAction.success, createUserUpdateState),
  handleAction(deleteUsersAction.success, deleteUsersUpdateState),
  handleAction(getMyProfileAction.success, getMyProfileUpdateState),
  handleAction(getUsersAction.success, getUsersUpdateState),
  handleAction(updateMyProfileAction.success, updateMyProfileUpdateState),
  handleAction(updateUserAction.success, updateUserUpdateState),
]);

export default UserReducer;
