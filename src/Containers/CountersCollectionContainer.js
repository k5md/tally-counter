import React from 'react';
import { connect } from 'react-redux';
import { CountersCollection } from '../Components';
import * as countersActions from '../actions/countersActions';

const mapStateToProps = ({ countersReducer: { data, order }, uiReducer: { displayType } }) => ({
  data,
  order,
  displayType,
});

const mapDispatchToProps = dispatch => ({
  rearrange: order => dispatch(countersActions.rearrange(order)),
});

const CountersCollectionContainer = props => <CountersCollection {...props} />;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CountersCollectionContainer);
