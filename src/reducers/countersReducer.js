import update from 'immutability-helper';
import { uniqueId } from 'lodash';
import * as types from '../constants/actionTypes';
import { randomRGB } from '../utils';

const initialState = {
  data: {}, // EXAMPLE: '0': { id: 0, title: 'Example', value: 0, step: 1, imageString: '', colorString: randomRGB(),
  order: [], // EXAMPLE: [0, 1] - array of data ids
};

const handlers = {
  [types.COUNTER_CREATE_SUCCESS]: (state, { payload: { id, value, date } }) => {
    const counter = {
      id,
      value,
      date,
      title: uniqueId(),
      step: 1,
      imageString: null,
      colorString: randomRGB(),
    };
    return update(state, { data: { [id]: { $set: counter } }, order: { $push: [id] } });
  },

  [types.COUNTER_INCREMENT]: (state, { id, step }) =>
    update(state, { data: { [id]: { value: { $apply: value => value + step } } } }),

  [types.COUNTER_DECREMENT]: (state, { id, step }) =>
    update(state, { data: { [id]: { value: { $apply: value => value - step } } } }),

  [types.COUNTER_UPDATE]: (state, { id, fields }) =>
    update(state, { data: { [id]: { $merge: { ...fields } } } }),

  [types.COUNTER_REMOVE]: (state, { id }) =>
    update(state, { data: { $unset: [id] }, order: { $unset: [id] } }),

  [types.COUNTER_REARRANGE]: (state, { order }) => update(state, { order: { $set: order } }),
};

const countersReducer = (state = initialState, action) => {
  if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
    return handlers[action.type](state, action);
  }
  return state;
};

export default countersReducer;
