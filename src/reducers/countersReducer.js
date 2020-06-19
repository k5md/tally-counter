import update from 'immutability-helper';
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
  [types.COUNTER_INCREMENT]: (state, { id }) =>
    update(state, { data: { [id]: { value: { $apply: value => value + state.data[id].step } } } }),

  [types.COUNTER_DECREMENT]: (state, { id }) =>
    update(state, { data: { [id]: { value: { $apply: value => value - state.data[id].step } } } }),

  [types.COUNTER_CREATE]: (
    state,
    {
      initialValue: {
        id = String(state.idsCreated),
        title = `New counter ${state.idsCreated}`,
        step = 1,
        value = 0,
        imageString = '',
        colorString = randomRGB(),
      },
    },
  ) => {
    return update(state, {
      data: { [id]: { $set: { id, title, step, value, imageString, colorString } } },
      idsCreated: { $apply: idsCreated => idsCreated + 1 },
      order: { $push: [{ key: id, order: state.idsCreated + 1 }] },
    });
  },

  [types.COUNTER_UPDATE]: (state, { id, fields }) => {
    return update(state, { data: { [id]: { $merge: { fields } } } });
  },

  [types.COUNTER_REMOVE]: (state, { id }) => {
    // NOTE: $splice introduces null variables and empty slots
    const newData = state.data.filter(entry => entry.id !== id);
    const newOrder = state.order.filter(entry => entry.key !== id);
    return update(state, {
      data: { $set: newData },
      order: { $set: newOrder },
    });
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
