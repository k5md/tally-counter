import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { Entry, SortableGrid } from './';

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  contentContainer: {
    width: window.width,
    paddingHorizontal: 0,
  },
  block: {
    flex: 1,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItem: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 70,
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'grey',
  },
});

export const CountersCollection = ({ displayType, data, order, rearrange }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // console.log('rerender collection');

  const filtered = data.filter(counter => counter.title.toLowerCase().includes(searchQuery));
  const sortable = searchQuery === '';

  return (
    <>
      <Searchbar
        placeholder="Search"
        onChangeText={value => setSearchQuery(value.toLowerCase())}
        value={searchQuery}
      />

      <View style={{ flex: 1 }}>
        <SortableGrid
          data={filtered}
          renderer={({ item }) => <Entry entry={item} style={styles.block} />}
          keyExtractor={item => item.id}
          
        />
      </View>
      {/*<SortableGrid
        blockTransitionDuration={400}
        activeBlockCenteringDuration={200}
        dragActivationTreshold={200}
        itemsPerRow={displayType.name === 'grid' ? 4 : 1}
      >
        {filtered.map(entry => {
          const { id } = entry;
          return <Entry key={id} entry={entry} style={styles.block} inactive={!sortable} />;
        })}
      </SortableGrid>*/}
    </>
  );
};
