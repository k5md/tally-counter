import * as types from '../constants/actionTypes';

export const increment = (id, value, step) => ({
  id,
  value,
  step,
  type: types.COUNTER_INCREMENT,
});

export const decrement = (id, value, step) => ({
  id,
  value,
  step,
  type: types.COUNTER_DECREMENT,
});

export const create = (initialValue = {}) => ({
  initialValue,
  type: types.COUNTER_CREATE,
});

export const setTitle = (id, title) => ({
  id,
  title,
  type: types.COUNTER_SET_TITLE,
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

export const setColorString = (id, colorString) => ({
  id,
  colorString,
  type: types.COUNTER_SET_COLORSTRING,
});

export const setImageString = (id, imageString) => ({
  id,
  imageString,
  type: types.COUNTER_SET_IMAGESTRING,
});

export const remove = id => ({
  id,
  type: types.COUNTER_REMOVE,
});

export const rearrange = order => ({
  order,
  type: types.COUNTER_REARRANGE,
});
