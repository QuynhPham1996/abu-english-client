import { createReducer } from 'deox';

const initialState = {};

const reducer = createReducer(initialState, (handleAction) => [
  // handleAction(uiActions.setSmoothScrollContainer, (state, { payload }) => ({
  //   ...state,
  //   smoothScrollContainer: payload.data,
  // })),
]);

export default reducer;
