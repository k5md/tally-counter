import * as types from '../constants/actionTypes';

export const read = (ids, selectedFrame) => ({ ids, selectedFrame, type: types.STATISTICS_READ });

export const selectId = (id, selected) => ({
  id,
  selected,
  type: types.STATISTICS_SELECT_ID,
});

export const selectFrame = id => ({
  id,
  type: types.STATISTICS_SELECT_FRAME,
});
