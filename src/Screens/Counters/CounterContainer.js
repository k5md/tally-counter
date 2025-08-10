import React from 'react';
import { connect } from 'react-redux';
import { toHsv, fromHsv } from '../../utils';
import Counter from './Counter';
import * as countersActions from '../../actions/countersActions';
import { useForm } from '../../hooks';

const mapStateToProps = ({ countersReducer }, { id }) => ({
  entry: countersReducer.data[id],
});

const mapDispatchToProps = (dispatch, { id }) => ({
  increment: (value, step) => dispatch(countersActions.increment(id, value, step)),
  decrement: (value, step) => dispatch(countersActions.decrement(id, value, step)),
  remove: () => dispatch(countersActions.remove(id)),
  setValue: value => dispatch(countersActions.setValue(id, value)),
  setStep: step => dispatch(countersActions.setStep(id, step)),
  setTitle: title => dispatch(countersActions.setTitle(id, title)),
  setColorString: colorString => dispatch(countersActions.setColorString(id, colorString)),
  setImageString: imageString => dispatch(countersActions.setImageString(id, imageString)),
});

const CounterContainer = props => {
  const { entry, setTitle, setValue, setStep, setColorString, setImageString } = props;

  const [fields, submit] = useForm([
    { prop: 'title', value: entry.title, set: setTitle },
    { prop: 'value', value: entry.value, set: setValue, check: v => !isNaN(v), post: Number, pre: String },
    { prop: 'step', value: entry.step, set: setStep, check: v => !isNaN(v), post: Number, pre: String },
    { prop: 'colorString', value: entry.colorString, set: setColorString },
    { prop: 'imageString', value: entry.imageString, set: setImageString },
  ]);

  return <Counter {...props} fields={fields} submit={submit} />;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CounterContainer);
