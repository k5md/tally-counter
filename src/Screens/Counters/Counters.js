import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import CountersCollectionContainer from './CountersCollectionContainer';
import { color } from '../../config/styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.COLOR_SECONDARY,
  },
  fabContainer: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  fab: {
    margin: 10,
    backgroundColor: color.COLOR_PRIMARY,
    borderRadius: 10,
  },
});

const Counters = ({ nextDisplayType, setDisplayType, create }) => {
  return (
    <View style={styles.container}>
      <CountersCollectionContainer />
      <View style={styles.fabContainer}>
        <FAB style={styles.fab} icon={nextDisplayType.icon} onPress={() => setDisplayType(nextDisplayType)} />
        <FAB style={styles.fab} icon="plus" onPress={() => create()} />
      </View>
    </View>
  );
};

export default Counters;
