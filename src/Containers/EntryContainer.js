import React from 'react';
import { connect } from 'react-redux';
import { Entry } from '../Components';
import * as countersActions from '../actions/countersActions';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  increment: (id, value, step) => dispatch(countersActions.increment(id, value, step)),
  decrement: (id, value, step) => dispatch(countersActions.decrement(id, value, step)),
});

const EntryContainer = props => <Entry {...props} />;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EntryContainer);
