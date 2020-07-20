import update from 'immutability-helper';
import * as types from '../constants/actionTypes';
import { randomRGB } from '../utils';

const initialState = {
  data: {}, // EXAMPLE: '0': { id: 0, title: 'Example', value: 0, step: 1, imageString: '', colorString: randomRGB(),
  order: [], // EXAMPLE: [0, 1] - array of data ids
};

const handlers = {
  [types.COUNTER_CREATE_SUCCESS]: (state, { payload: { id, value, date, title } }) => ({
    ...state,
    data: {
      ...state.data,
      [id]: {
        id,
        value,
        date,
        title,
        step: 1,
        imageString: null,
        colorString: randomRGB(),
      },
    },
    order: [...state.order, id],
  }),

  [types.COUNTER_INCREMENT]: (state, { id, step }) => ({
    ...state,
    data: { ...state.data, [id]: { ...state.data[id], value: state.data[id].value + step } },
  }),

  [types.COUNTER_DECREMENT]: (state, { id, step }) => ({
    ...state,
    data: { ...state.data, [id]: { ...state.data[id], value: state.data[id].value - step } },
  }),

  [types.COUNTER_UPDATE]: (state, { id, fields }) => ({
    ...state,
    data: { ...state.data, [id]: { ...state.data[id], ...fields } },
  }),

  [types.COUNTER_REMOVE]: (state, { id }) =>
    update(state, { data: { $unset: [id] }, order: { $unset: [id] } }),

  [types.COUNTER_REARRANGE]: (state, { order }) => ({ ...state, order }),
};

const countersReducer = (state = initialState, action) => {
  if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
    return handlers[action.type](state, action);
  }
  return state;
};

export default countersReducer;
