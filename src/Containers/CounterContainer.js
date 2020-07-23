import React from 'react';
import { connect } from 'react-redux';
import { Counter } from '../Components';
import * as countersActions from '../actions/countersActions';

const mapStateToProps = ({ countersReducer }, ownProps) => {
  const { id } = ownProps;
  return {
    entry: countersReducer.data[id],
  };
};

const mapDispatchToProps = dispatch => ({
  increment: (id, value, step) => dispatch(countersActions.increment(id, value, step)),
  decrement: (id, value, step) => dispatch(countersActions.decrement(id, value, step)),
  remove: id => dispatch(countersActions.remove(id)),
  setValue: (id, value) => dispatch(countersActions.setValue(id, value)),
  setStep: (id, step) => dispatch(countersActions.setStep(id, step)),
  setTitle: (id, title) => dispatch(countersActions.setTitle(id, title)),
  setColorString: (id, colorString) => dispatch(countersActions.setColorString(id, colorString)),
  setImageString: (id, imageString) => dispatch(countersActions.setImageString(id, imageString)),
});

const CounterContainer = props => <Counter {...props} />;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CounterContainer);
