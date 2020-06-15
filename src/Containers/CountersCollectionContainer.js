import { connect } from 'react-redux';
import { CountersCollection } from '../Components';
import * as countersActions from '../actions/countersActions';

const mapStateToProps = ({
  countersReducer: { data, order },
  uiReducer: { currentDisplayType },
}) => {
  return { data, displayType: currentDisplayType, order };
};

const mapDispatchToProps = dispatch => ({
  rearrange: data => dispatch(countersActions.rearrange(data)),
});

export const CountersCollectionContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CountersCollection);
