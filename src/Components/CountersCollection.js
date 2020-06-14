import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import SortableList from 'react-native-sortable-list';
import SortableGrid from 'react-native-sortable-grid-with-fixed';
import { Entry } from './';

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  contentContainer: {
    width: window.width,
    paddingHorizontal: 0,
  },
  block: {
    flex: 0,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const CountersCollection = ({ displayType, data }) => {
  const [searchQuery, setSearchQuery] = useState('');

  console.log('rerender collection', data);
  const filtered = data.filter(counter =>
    counter.title.toLowerCase().includes(searchQuery),
  );
  const sortable = searchQuery === '';

  return (
    <>
      <Searchbar
        placeholder="Search"
        onChangeText={value => setSearchQuery(value.toLowerCase())}
        value={searchQuery}
      />

      {displayType.name === 'list' && (
        <SortableList
          style={styles.list}
          contentContainerStyle={styles.contentContainer}
          data={filtered}
          sortingEnabled={sortable}
          renderRow={(props) => {
            console.log(props);
            const entry = props.data;
            const { id } = entry;
            return <Entry key={id} entry={entry} style={styles.block} />;
          }}
        />
      )}
      {displayType.name === 'grid' && (
        <SortableGrid
          blockTransitionDuration={400}
          activeBlockCenteringDuration={200}
          dragActivationTreshold={200}
          onDragRelease={itemOrder => console.log(itemOrder)}
        >
          {filtered.map(entry => {
            const { id } = entry;
            return (
              <Entry
                key={id}
                entry={entry}
                style={styles.block}
                inactive={!sortable}
              />
            );
          })}
        </SortableGrid>
      )}
    </>
  );
};
