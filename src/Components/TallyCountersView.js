import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Searchbar, FAB} from 'react-native-paper';
import {GridView} from './';

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export const TallyCountersView = ({nextDisplayType, setDisplayType}) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
      />

      <GridView />

      <FAB
        style={styles.fab}
        small
        icon={nextDisplayType.icon}
        onPress={() => setDisplayType(nextDisplayType)}
      />
    </>
  );
};
