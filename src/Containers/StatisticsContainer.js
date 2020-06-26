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
  read: (id, window) => dispatch(statisticsActions.read(id, window)),
});

export const StatisticsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Statistics);
