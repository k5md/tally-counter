import React from 'react';
import { connect } from 'react-redux';
import { Statistics } from '../Components';
import * as statisticsActions from '../actions/statisticsActions';

const mapStateToProps = ({
  statisticsReducer: { data: stats, selectableIds, selectableFrames },
  countersReducer: { data: counters },
}) => ({ 
  stats: stats.filter(({ id }) => counters[id]).map(({ id, value, date }) => {
  const dateObject = new Date(date);
  return {
    value,
    title: counters[id].title,
    milliseconds: dateObject.getTime(),
    date: dateObject.toLocaleDateString(),
    time: dateObject.toLocaleTimeString(),
  };
}), counters, selectableFrames, selectableIds });

const mapDispatchToProps = dispatch => ({
  read: (ids, window) => dispatch(statisticsActions.read(ids, window)),
  selectId: (id, selected) => dispatch(statisticsActions.selectId(id, selected)),
  selectFrame: id => dispatch(statisticsActions.selectFrame(id)),
});

const StatisticsContainer = props => <Statistics {...props} />;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StatisticsContainer);
