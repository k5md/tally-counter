import update from 'immutability-helper';
import * as types from '../constants/actionTypes';

const initialState = {
  data: {},
};

const handlers = {
  [types.STATISTICS_READ_SUCCESS]: (state, { payload }) =>
    update(state, { data: { $set: payload } }),
};

const statisticsReducer = (state = initialState, action) => {
  if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
    return handlers[action.type](state, action);
  }
  return state;
};

export default statisticsReducer;
