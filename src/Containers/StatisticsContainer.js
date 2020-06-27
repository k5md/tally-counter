import React from 'react';
import { connect } from 'react-redux';
import { Statistics } from '../Components';
import * as statisticsActions from '../actions/statisticsActions';

const mapStateToProps = ({
  statisticsReducer: { data: stats },
  countersReducer: { data: counters },
}) => ({ stats, counters });

const mapDispatchToProps = dispatch => ({
  read: (id, window) => dispatch(statisticsActions.read(id, window)),
});

const StatisticsContainer = props => <Statistics {...props} />;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StatisticsContainer);
