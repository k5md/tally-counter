import * as types from '../constants/actionTypes';

export const read = (id, window) => ({
  id,
  window,
  type: types.STATISTICS_READ,
});
