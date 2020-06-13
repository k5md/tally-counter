import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Searchbar, FAB } from 'react-native-paper';
import { GridView, ListView, ModalView, NewCounterView } from './';

const styles = StyleSheet.create({
  fabContainer: {
    display: 'flex',
    flexDirection: 'row',
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
  const [modalVisible, setModalVisible] = useState(false);


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
        onChangeText={value => setSearchQuery(value.toLowerCase())}
        value={searchQuery}
      />

      <CountersRenderer data={visibleCounters} sortable={searchQuery === ''} />

      <View style={styles.fabContainer}>
        <FAB
          style={styles.fab}
          small
          icon={nextDisplayType.icon}
          onPress={() => setDisplayType(nextDisplayType)}
        />
        <FAB
          style={styles.fab}
          small
          icon="plus"
          onPress={() => setModalVisible(true)}
        />
      </View>
      <ModalView visible={modalVisible} onClose={() => setModalVisible(false)}>
        <NewCounterView onClose={() => setModalVisible(false)} />
      </ModalView>
    </>
  );
};
