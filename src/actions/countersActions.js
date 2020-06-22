import { uniqueId } from 'lodash';
import { randomRGB } from '../utils';
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

export const create = initialValue => {
  // NOTE: since storageSaga listens to create action among others, we have to move defaults from reducer
  const defaults = {
    id: uniqueId(),
    title: 'New counter',
    step: 1,
    value: 0,
    imageString: '',
    colorString: randomRGB(),
    date: Date.now(),
  };
  return {
    initialValue: Object.assign({}, defaults, initialValue),
    type: types.COUNTER_CREATE,
  };
};

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
