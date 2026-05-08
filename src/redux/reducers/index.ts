import { combineReducers } from 'redux';

import { loadingReducer, errorReducer, successReducer } from './status';
import authReducer from './auth';
import courseReducer from './course';
import exerciseReducer from './exercise';
import lessonReducer from './lesson';
import notificationReducer from './notification';
import publicReducer from './public';
import questionReducer from './question';
import testReducer from './test';
import uiReducer from './ui';
import userReducer from './user';

const rootReducer = combineReducers({
  loadingReducer,
  errorReducer,
  successReducer,
  authReducer,
  courseReducer,
  exerciseReducer,
  lessonReducer,
  notificationReducer,
  publicReducer,
  questionReducer,
  testReducer,
  uiReducer,
  userReducer,
});

export default rootReducer;

export type TRootState = ReturnType<typeof rootReducer>;
