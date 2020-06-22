import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import { CountersCollectionContainer } from '../Containers';

const styles = StyleSheet.create({
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
  },
});

export const Counters = ({ nextDisplayType, setDisplayType, create }) => {
  return (
    <>
      <CountersCollectionContainer />
      <View style={styles.fabContainer}>
        <FAB
          style={styles.fab}
          icon={nextDisplayType.icon}
          onPress={() => setDisplayType(nextDisplayType)}
        />
        <FAB style={styles.fab} icon="plus" onPress={() => create()} />
      </View>
    </>
  );
};
