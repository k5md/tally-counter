import { useState } from 'react';
import { identity } from 'lodash';
import { capitalize } from '../utils';

export const useForm = fields => {
  const localProps = fields.reduce(
    (acc, { prop, value, pre = identity, post = identity, check = () => true }) => {
      const [field, setField] = useState(pre(value));
      return { ...acc, [prop]: field, [`set${capitalize(prop)}`]: v => check(v) && setField(pre(v)) };
    },
    {},
  );

  const submit = () => {
    fields.forEach(({ prop, value, set, post = identity }) => {
      const { [prop]: localValue } = localProps;
      if (post(localValue) === post(value)) {
        return;
      }
      set(post(localValue));
    });
  };

  return [localProps, submit];
};
