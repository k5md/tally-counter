import * as types from '../constants/actionTypes';

export const increment = (id, value, step) => ({
  id,
  value,
  step,
  date: Date.now(),
  type: types.COUNTER_INCREMENT,
});

export const decrement = (id, value, step) => ({
  id,
  value,
  step,
  date: Date.now(),
  type: types.COUNTER_DECREMENT,
});

export const create = (initialValue = {}) => ({
  initialValue,
  type: types.COUNTER_CREATE,
});

export const update = (id, fields) => ({
  id,
  date: Date.now(),
  fields,
  type: types.COUNTER_UPDATE,
});

export const remove = id => ({
  id,
  type: types.COUNTER_REMOVE,
});

export const rearrange = order => ({
  order,
  type: types.COUNTER_REARRANGE,
});
