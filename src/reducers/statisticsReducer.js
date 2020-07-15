import update from 'immutability-helper';
import * as types from '../constants/actionTypes';
import { getPrevDay, getPrevMonth, getPrevYear } from '../utils';

const current = {
  get date() {
    return new Date();
  },
};

const initialState = {
  data: [],
  selectableIds: [],
  selectableFrames: [
    { id: '1d', title: '1d', window: () => [getPrevDay(current.date), current.date.getTime()], selected: true },
    { id: '3d', title: '3d', window: () => [getPrevDay(current.date, 3), current.date.getTime()], selected: false },
    { id: 'M', title: 'M', window: () => [getPrevMonth(current.date), current.date.getTime()], selected: false },
    { id: 'Y', title: 'Y', window: () => [getPrevYear(current.date), current.date.getTime()], selected: false },
    { id: 'All', title: 'All', window: () => [0, current.date.getTime()], selected: false },
  ],
};

const handlers = {
  [types.COUNTER_CREATE_SUCCESS]: (state, { payload: { id, title } }) => update(state, { selectableIds: { $push: [{ id, title, selected: false }]}}),

  [types.COUNTER_REMOVE]: (state, { id }) => update(state, { selectableIds: { $set: state.selectableIds.filter(item => item.id !== id)}}),

  [types.COUNTER_UPDATE]: (state, { id, fields }) => {
    if (Object.keys(fields).includes('title')) {
      const updatedSelectableIds = state.selectableIds.map(item => item.id === id ? ({...item, title: fields.title }) : item);
      return update(state, { selectableIds: { $set: updatedSelectableIds } });
    } else {
      return state;
    }
  },

  [types.STATISTICS_READ_SUCCESS]: (state, { payload }) =>
    update(state, { data: { $set: payload } }),

  [types.STATISTICS_SELECT_ID]: (state, { id, selected}) => {
    const updatedSelectableIds = state.selectableIds.map(item => item.id === id ? ({ ...item, selected }) : item);
    return update(state, { selectableIds: { $set: updatedSelectableIds } });
  },
  [types.STATISTICS_SELECT_FRAME]: (state, { id }) => {
    const updatedSelectableFrames = state.selectableFrames.map(item => ({ ...item, selected: item.id === id }));
    return update(state, { selectableFrames: { $set: updatedSelectableFrames } });
  },
};

const statisticsReducer = (state = initialState, action) => {
  if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
    return handlers[action.type](state, action);
  }
  return state;
};

export default statisticsReducer;
