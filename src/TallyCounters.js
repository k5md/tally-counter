import React, {useState, useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {Searchbar, FAB} from 'react-native-paper';
import GridView from './GridView';

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export const TallyCounters = () => {
  const counters = [
    {title: '', value: 0, step: 1, color: '#ffffff'},
    {title: 'counter 2', value: 0, step: 1, image_uri: ''},
  ];

  const [searchQuery, setSearchQuery] = useState('');

  const displayTypes = [
    {name: 'list', icon: 'view-list'},
    {name: 'grid', icon: 'view-grid'},
  ];

  const [displayType, setDisplayType] = useState(displayTypes[0]);
  const getNextDisplayType = () => {
    const currentIndex = displayTypes.findIndex(
      dt => displayType.name === dt.name,
    );
    const nextIndex = (currentIndex + 1) % displayTypes.length;
    return displayTypes[nextIndex];
  };
  const nextDisplayType = getNextDisplayType();

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

export default TallyCounters;
