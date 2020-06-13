import * as types from '../constants/actionTypes';

const displayTypes = [
  { name: 'list', icon: 'view-list' },
  { name: 'grid', icon: 'view-grid' },
];

const initialState = {
  displayTypes: [...displayTypes],
  currentDisplayType: { ...displayTypes[0] },
};

const handlers = {
  [types.UI_SET_DISPLAY_TYPE]: (state, { displayType }) => ({
    ...state,
    currentDisplayType: displayType,
  }),
};

const uiReducer = (state = initialState, action) => {
  if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
    return handlers[action.type](state, action);
  }
  return state;
};

export default uiReducer;
