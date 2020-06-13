import { uniqueId, omit } from 'lodash';
import * as types from '../constants/actionTypes';
import { randomRGB } from '../utils';

const initialState = {
  0: {
    id: 0,
    title: 'Example counter',
    value: 0,
    step: 1,
    imageString: null,
    colorString: randomRGB(),
  },
  1: {
    id: 1,
    title: 'Example',
    value: 0,
    step: 1,
    imageString: null,
    colorString: randomRGB(),
  },
};

const handlers = {
  [types.COUNTER_INCREMENT]: (state, { id }) => {
    const oldCounter = state[id];
    const newCounter = {
      ...oldCounter,
      value: oldCounter.value + oldCounter.step,
    };
    return { ...state, [id]: newCounter };
  },

  [types.COUNTER_DECREMENT]: (state, { id }) => {
    const oldCounter = state[id];
    const newCounter = {
      ...oldCounter,
      value: oldCounter.value - oldCounter.step,
    };
    return { ...state, [id]: newCounter };
  },

  [types.COUNTER_CREATE]: (
    state,
    {
      initialValue: {
        title,
        step = 1,
        value = 0,
        imageString = null,
        colorString = randomRGB(),
      },
    },
  ) => {
    const id = uniqueId();
    return {
      ...state,
      [id]: { id, title, step, value, imageString, colorString },
    };
  },

  [types.COUNTER_UPDATE]: (state, { id, fields }) => ({
    ...state,
    [id]: { ...state[id], ...fields },
  }),

  [types.COUNTER_SET_TITLE]: (state, { id, title }) => ({
    ...state,
    [id]: { ...state[id], title },
  }),

  [types.COUNTER_SET_IMAGE]: (state, { id, imageString }) => ({
    ...state,
    [id]: { ...state[id], imageString },
  }),

  [types.COUNTER_SET_COLOR]: (state, { id, colorString }) => ({
    ...state,
    [id]: { ...state[id], colorString },
  }),

  [types.COUNTER_SET_STEP]: (state, { id, step }) => ({
    ...state,
    [id]: { ...state[id], step },
  }),

  [types.COUNTER_SET_VALUE]: (state, { id, value }) => ({
    ...state,
    [id]: { ...state[id], value },
  }),

  [types.COUNTER_REMOVE]: (state, { id }) => omit(state, id),
};

const countersReducer = (state = initialState, action) => {
  if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
    return handlers[action.type](state, action);
  }
  return state;
};

export default countersReducer;
