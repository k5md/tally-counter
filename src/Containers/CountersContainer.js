import { connect } from 'react-redux';
import * as uiActions from '../actions/uiActions';
import * as countersActions from '../actions/countersActions';
import { Counters } from '../Components';

const getNextDisplayType = (displayTypes, displayType) => {
  if (!displayTypes) {
    return displayType;
  }
  const currentIndex = displayTypes.findIndex(dt => displayType.name === dt.name);
  const nextIndex = (currentIndex + 1) % displayTypes.length;
  return displayTypes[nextIndex];
};

const mapStateToProps = ({ uiReducer: { displayTypes, displayType } }) => {
  return {
    displayType,
    nextDisplayType: getNextDisplayType(displayTypes, displayType),
  };
};

const mapDispatchToProps = dispatch => ({
  setDisplayType: displayType => dispatch(uiActions.setDisplayType(displayType)),
  create: initialValue => dispatch(countersActions.create(initialValue)),
});

export const CountersContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Counters);
