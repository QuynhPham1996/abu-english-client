import { TPublicState } from '@/redux/reducers/public';
import { TSendContactSuccess } from '@/redux/actions/public';

export const sendContactUpdateState = (state: TPublicState, action: TSendContactSuccess): TPublicState => ({
  ...state,
  sendContactResponse: action.payload.response,
});
