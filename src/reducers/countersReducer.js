import * as types from '../constants/actionTypes';

const initialState = {
  data: {}, // EXAMPLE: '0': { id: 0, title: 'Example', value: 0, step: 1, imageString: '', colorString: randomRGB(),
  order: [], // EXAMPLE: [0, 1] - array of data ids
};

const handlers = {
  [types.COUNTER_CREATE_SUCCESS]: (state, { payload }) => ({
    ...state,
    data: { ...state.data, [payload.id]: payload },
    order: state.order.concat(payload.id),
  }),

  [types.COUNTER_INCREMENT]: (state, { id, step }) => ({
    ...state,
    data: { ...state.data, [id]: { ...state.data[id], value: state.data[id].value + step } },
  }),

  [types.COUNTER_DECREMENT]: (state, { id, step }) => ({
    ...state,
    data: { ...state.data, [id]: { ...state.data[id], value: state.data[id].value - step } },
  }),

  [types.COUNTER_SET_TITLE]: (state, { id, title }) => ({
    ...state,
    data: { ...state.data, [id]: { ...state.data[id], title } },
  }),
  [types.COUNTER_SET_VALUE]: (state, { id, value }) => ({
    ...state,
    data: { ...state.data, [id]: { ...state.data[id], value } },
  }),
  [types.COUNTER_SET_STEP]: (state, { id, step }) => ({
    ...state,
    data: { ...state.data, [id]: { ...state.data[id], step } },
  }),
  [types.COUNTER_SET_COLORSTRING]: (state, { id, colorString }) => ({
    ...state,
    data: { ...state.data, [id]: { ...state.data[id], colorString } },
  }),
  [types.COUNTER_SET_IMAGESTRING]: (state, { id, imageString }) => ({
    ...state,
    data: { ...state.data, [id]: { ...state.data[id], imageString } },
  }),

  [types.COUNTER_REMOVE]: (state, { id }) => {
    const { [id]: omittedId, ...data } = state.data;
    const order = state.order.filter(item => id !== item.id);
    return { ...state, data, order };
  },

  [types.COUNTER_REARRANGE]: (state, { order }) => ({ ...state, order }),
};

const countersReducer = (state = initialState, action) => {
  if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
    return handlers[action.type](state, action);
  }
  return state;
};

export default countersReducer;
