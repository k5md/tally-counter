import { connect } from 'react-redux';
import { CountersCollection } from '../Components';

const mapStateToProps = ({
  countersReducer: { data },
  uiReducer: { currentDisplayType },
}) => {
  return { data, displayType: currentDisplayType };
};

const mapDispatchToProps = () => ({});

export const CountersCollectionContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(CountersCollection);
