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

export const setTitle = (id, title) => ({
  id,
  title,
  type: types.COUNTER_SET_TITLE,
});

export const setImage = (id, dataString) => ({
  id,
  dataString,
  type: types.COUNTER_SET_IMAGE,
});

export const setColor = (id, colorString) => ({
  id,
  colorString,
  type: types.COUNTER_SET_COLOR,
});

export const setStep = (id, step) => ({
  id,
  step,
  type: types.COUNTER_SET_STEP,
});

export const setValue = (id, value) => ({
  id,
  value,
  type: types.COUNTER_SET_VALUE,
});

export const remove = id => ({
  id,
  type: types.COUNTER_REMOVE,
});
