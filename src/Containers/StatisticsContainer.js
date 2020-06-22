import { connect } from 'react-redux';
import { Statistics } from '../Components';
import * as statisticsActions from '../actions/statisticsActions';

const mapStateToProps = ({ statisticsReducer }) => {
  return {
    data: statisticsReducer.data,
  };
};

const mapDispatchToProps = dispatch => ({
  read: () => dispatch(statisticsActions.read()),
});

export const StatisticsContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Statistics);
