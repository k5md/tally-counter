import update from 'immutability-helper';
import * as types from '../constants/actionTypes';
import { randomRGB } from '../utils';

const initialState = {
  data: {}, // EXAMPLE: '0': { id: 0, title: 'Example', value: 0, step: 1, imageString: '', colorString: randomRGB(),
  order: {}, // EXAMPLE: '0': { key: 0, order: 0 }
};

const handlers = {
  [types.COUNTER_CREATE_SUCCESS]: (state, { payload: { id, value, date } }) => {
    const counter = {
      id,
      value,
      date,
      title: 'New counter',
      step: 1,
      imageString: null,
      colorString: randomRGB(),
    };
    return update(state, {
      data: { [id]: { $set: counter } },
      order: { $merge: { [id]: { key: id, order: Object.keys(state.order).length } } },
    });
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
