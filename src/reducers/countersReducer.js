import update from 'immutability-helper';
import { cloneDeep } from 'lodash';
import * as types from '../constants/actionTypes';
import { randomRGB } from '../utils';

const initialState = {
  idsCreated: 2,
  data: [
    {
      id: '0',
      title: 'Example counter',
      value: 0,
      step: 1,
      imageString: '',
      colorString: randomRGB(),
    },
    {
      id: '1',
      title: 'Example',
      value: 0,
      step: 1,
      imageString: '',
      colorString: randomRGB(),
    },
  ],
  order: [{ key: '0', order: 0 }, { key: '1', order: 1 }], // where key is counter id
};

const handlers = {
  [types.COUNTER_INCREMENT]: (state, { id }) => {
    const newState = cloneDeep(state);
    newState.data.forEach(counter =>
      counter.id === id ? { ...counter, value: counter.value + counter.step } : counter,
    );
    return newState;
  },

  [types.COUNTER_DECREMENT]: (state, { id }) => {
    const newState = cloneDeep(state);
    newState.data.forEach(counter =>
      counter.id === id ? { ...counter, value: counter.value - counter.step } : counter,
    );
    return newState;
  },

  [types.COUNTER_CREATE]: (
    state,
    {
      initialValue: {
        id = state.idsCreated,
        title = `New counter ${state.idsCreated}`,
        step = 1,
        value = 0,
        imageString = '',
        colorString = randomRGB(),
      },
    },
  ) => {
    const newState = cloneDeep(state);
    newState.data.push({ id, title, step, value, imageString, colorString });
    newState.idsCreated += 1;
    newState.order.push({key: String(id), order: state.order.length});
    return newState;
  },

  [types.COUNTER_UPDATE]: (state, { id, fields }) => {
    const newState = cloneDeep(state);
    newState.data.forEach(counter => (counter.id === id ? { ...counter, ...fields } : counter));
    return newState;
  },

  [types.COUNTER_REMOVE]: (state, { id }) => {
    const newState = cloneDeep(state);
    newState.data = newState.data.filter(item => item.id !== id);
    return newState;
  },

  [types.COUNTER_REARRANGE]: (state, { order }) => update(state, { order: { $set: order } }),
};

const countersReducer = (state = initialState, action) => {
  if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
    return handlers[action.type](state, action);
  }
  return state;
};

export default countersReducer;
