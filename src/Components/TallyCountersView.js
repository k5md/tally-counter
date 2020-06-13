import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Searchbar, FAB } from 'react-native-paper';
import { GridView, ListView } from './';

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export const TallyCountersView = ({
  currentDisplayType,
  nextDisplayType,
  setDisplayType,
  counters,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const CountersRenderer = props => {
    const Renderer = {
      list: ListView,
      grid: GridView,
    }[currentDisplayType.name];
    return <Renderer {...props} />;
  };

  const visibleCounters = counters.filter(counter =>
    counter.title.toLowerCase().includes(searchQuery),
  );

  return (
    <>
      <Searchbar
        placeholder="Search"
        onChangeText={(value) => setSearchQuery(value.toLowerCase())}
        value={searchQuery}
      />

      <CountersRenderer data={visibleCounters} sortable={searchQuery === ''} />

      <FAB
        style={styles.fab}
        small
        icon={nextDisplayType.icon}
        onPress={() => setDisplayType(nextDisplayType)}
      />
    </>
  );
};
