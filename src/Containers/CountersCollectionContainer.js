import { connect } from 'react-redux';
import { CountersCollection } from '../Components';
import * as countersActions from '../actions/countersActions';

const mapStateToProps = ({ countersReducer: { data, order }, uiReducer: { displayType } }) => {
  return { data, order, displayType };
};

const mapDispatchToProps = dispatch => ({
  rearrange: order => dispatch(countersActions.rearrange(order)),
});

export const CountersCollectionContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CountersCollection);
