import React from 'react';
import { connect } from 'react-redux';
import { Statistics } from '../Components';
import * as statisticsActions from '../actions/statisticsActions';

const mapStateToProps = ({
  statisticsReducer: { data: stats, selectableIds, selectableFrames },
  countersReducer: { data: counters },
}) => ({ stats, counters, selectableFrames, selectableIds: selectableIds.map(item => ({ ...item, title: counters[item.id].title })) });

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
