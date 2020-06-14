import { connect } from 'react-redux';
import * as uiActions from '../actions/uiActions';
import * as countersActions from '../actions/countersActions';
import { Counters } from '../Components';

const getNextDisplayType = (displayTypes, currentDisplayType) => {
  if (!displayTypes) {
    return currentDisplayType;
  }
  const currentIndex = displayTypes.findIndex(
    dt => currentDisplayType.name === dt.name,
  );
  const nextIndex = (currentIndex + 1) % displayTypes.length;
  return displayTypes[nextIndex];
};

const mapStateToProps = ({
  uiReducer: { displayTypes, currentDisplayType },
}) => {
  return {
    currentDisplayType,
    nextDisplayType: getNextDisplayType(displayTypes, currentDisplayType),
  };
};

const mapDispatchToProps = dispatch => ({
  setDisplayType: displayType =>
    dispatch(uiActions.setDisplayType(displayType)),
  create: initialValue => dispatch(countersActions.create(initialValue)),
});

export const CountersContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Counters);
