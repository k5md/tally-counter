import React from 'react';
import { connect } from 'react-redux';
import * as countersActions from '../actions/countersActions';
import { EntryView } from './';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  increment: id => dispatch(countersActions.increment(id)),
  decrement: id => dispatch(countersActions.decrement(id)),
});

export const EntryContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(EntryView);
