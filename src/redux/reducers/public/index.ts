import { createReducer } from 'deox';

import { TGetPublicCoursesResponse, TSendContactResponse } from '@/services/api/public';
import { getPublicCoursesAction, sendContactAction } from '@/redux/actions';
import { getPublicCoursesUpdateState } from './get-public-courses';
import { sendContactUpdateState } from './send-contact';

export type TPublicState = {
  getPublicCoursesResponse?: TGetPublicCoursesResponse;
  sendContactResponse?: TSendContactResponse;
};

const initialState: TPublicState = {
  getPublicCoursesResponse: undefined,
  sendContactResponse: undefined,
};

const PublicReducer = createReducer(initialState, (handleAction) => [
  handleAction(getPublicCoursesAction.success, getPublicCoursesUpdateState),
  handleAction(sendContactAction.success, sendContactUpdateState),
]);

export default PublicReducer;
