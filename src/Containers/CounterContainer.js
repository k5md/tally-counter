import { connect } from 'react-redux';
import { Counter } from '../Components';
import * as countersActions from '../actions/countersActions';

const mapStateToProps = ({ countersReducer }, ownProps) => {
  return {};
  const { id } = ownProps;
  return {
    entry: countersReducer.data[id],
  };
};

const mapDispatchToProps = dispatch => ({
  increment: id => dispatch(countersActions.increment(id)),
  decrement: id => dispatch(countersActions.decrement(id)),
  remove: id => dispatch(countersActions.remove(id)),
  update: (id, fields) => dispatch(countersActions.update(id, fields)),
});

export const CounterContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Counter);
