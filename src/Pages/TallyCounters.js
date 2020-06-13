import React from 'react';
import {connect} from 'react-redux';
import * as uiActions from '../actions/uiActions';
import {TallyCountersView} from '../Components';

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

const mapStateToProps = state => {
  return {
    counters: state.countersReducer,
    nextDisplayType: getNextDisplayType(
      state.uiReducer.displayTypes,
      state.uiReducer.currentDisplayType,
    ),
  };
};

const mapDispatchToProps = dispatch => ({
  setDisplayType: displayType =>
    dispatch(uiActions.setDisplayType(displayType)),
});

export const TallyCounters = connect(
  mapStateToProps,
  mapDispatchToProps,
)(TallyCountersView);
