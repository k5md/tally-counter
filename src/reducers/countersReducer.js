import { uniqueId, cloneDeep } from 'lodash';
import * as types from '../constants/actionTypes';
import { randomRGB } from '../utils';

const initialState = {
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
  ids: ['0', '1'],
};

const handlers = {
  [types.COUNTER_INCREMENT]: (state, { id }) => {
    const newState = cloneDeep(state);
    newState.data.forEach(counter =>
      counter.id === id
        ? { ...counter, value: counter.value + counter.step }
        : counter,
    );
    return newState;
  },

  [types.COUNTER_DECREMENT]: (state, { id }) => {
    const newState = cloneDeep(state);
    newState.data.forEach(counter =>
      counter.id === id
        ? { ...counter, value: counter.value - counter.step }
        : counter,
    );
    return newState;
  },

  [types.COUNTER_CREATE]: (
    state,
    {
      initialValue: {
        id = uniqueId(),
        title = uniqueId('New counter '),
        step = 1,
        value = 0,
        imageString = '',
        colorString = randomRGB(),
      },
    },
  ) => {
    const newState = cloneDeep(state);
    newState.data.push({ id, title, step, value, imageString, colorString });
    newState.ids.push(id);
    return newState;
  },

  [types.COUNTER_UPDATE]: (state, { id, fields }) => {
    const newState = cloneDeep(state);
    newState.data.forEach(counter =>
      counter.id === id ? { ...counter, ...fields } : counter,
    );
    return newState;
  },

  [types.COUNTER_REMOVE]: (state, { id }) => {
    const newState = cloneDeep(state);
    newState.data = newState.data.filter(item => item.id !== id);
    newState.ids = newState.ids.filter(item => item !== id);
    return newState;
  },
};

const countersReducer = (state = initialState, action) => {
  if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
    return handlers[action.type](state, action);
  }
  return state;
};

export default countersReducer;
