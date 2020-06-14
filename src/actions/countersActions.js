import * as types from '../constants/actionTypes';

export const increment = id => ({
  id,
  type: types.COUNTER_INCREMENT,
});

export const decrement = id => ({
  id,
  type: types.COUNTER_DECREMENT,
});

export const create = initialValue => ({
  initialValue,
  type: types.COUNTER_CREATE,
});

export const update = (id, fields) => ({
  id,
  fields,
  type: types.COUNTER_UPDATE,
});

export const remove = id => ({
  id,
  type: types.COUNTER_REMOVE,
});
