import { connect } from 'react-redux';
import { Statistics } from '../Components';
import * as statisticsActions from '../actions/statisticsActions';

const mapStateToProps = ({ statisticsReducer, countersReducer }) => {
  return {
    stats: statisticsReducer.data,
    counters: countersReducer.data,
  };
};

const mapDispatchToProps = dispatch => ({
  read: (id, stats) => dispatch(statisticsActions.read(id, stats)),
});

export const StatisticsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Statistics);
