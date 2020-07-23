import * as types from '../constants/actionTypes';

const initialState = {
  data: [],
  selectableIds: [],
  selectableFrames: [
    { id: '1d', title: '1d', selected: true },
    { id: '3d', title: '3d', selected: false },
    { id: 'M', title: 'M', selected: false },
    { id: 'Y', title: 'Y', selected: false },
    { id: 'All', title: 'All', selected: false },
  ],
};

const handlers = {
  [types.COUNTER_CREATE_SUCCESS]: (state, { payload: { id, title } }) => ({
    ...state,
    selectableIds: state.selectableIds.concat({ id, title, selected: false }),
  }),

  [types.COUNTER_REMOVE]: (state, { id }) => ({
    ...state,
    selectableIds: state.selectableIds.filter(item => item.id !== id),
  }),

  [types.COUNTER_SET_TITLE]: (state, { id, title }) => ({
    ...state,
    selectableIds: state.selectableIds.map(item => (item.id === id ? { ...item, title } : item)),
  }),

  [types.STATISTICS_READ_SUCCESS]: (state, { payload: data }) => ({ ...state, data }),

  [types.STATISTICS_SELECT_ID]: (state, { id, selected }) => ({
    ...state,
    selectableIds: state.selectableIds.map(item => (item.id === id ? { ...item, selected } : item)),
  }),
  [types.STATISTICS_SELECT_FRAME]: (state, { id }) => ({
    ...state,
    selectableFrames: state.selectableFrames.map(item => ({ ...item, selected: item.id === id })),
  }),
};

const statisticsReducer = (state = initialState, action) => {
  if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
    return handlers[action.type](state, action);
  }
  return state;
};

export default statisticsReducer;
