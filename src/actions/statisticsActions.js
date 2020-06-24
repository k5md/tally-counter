import * as types from '../constants/actionTypes';

export const read = (id, scope) => ({
  id,
  scope,
  type: types.STATISTICS_READ,
});
