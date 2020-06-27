import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { SortableGrid } from './';
import { EntryContainer } from '../Containers';

const styles = StyleSheet.create({
  block: {
    flex: 1,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class CountersCollection extends React.Component {
  constructor() {
    super();
  }

  state = {
    searchQuery: '',
  };

  render() {
    const { data, order, displayType, rearrange } = this.props;
    const { searchQuery } = this.state;

    const filtered = Object.values(data).filter(
      counter => counter && counter.title.toLowerCase().includes(searchQuery),
    );
    const sortable = searchQuery === '';

    return (
      <>
        <Searchbar
          placeholder="Search"
          onChangeText={value => this.setState(() => ({ searchQuery: value.toLowerCase() }))}
          value={searchQuery}
        />
        {displayType.name === 'grid' && (
          <SortableGrid
            itemsPerRow={4}
            blockHeight={100}
            itemOrder={order}
            onDragRelease={({ itemOrder }) => rearrange(itemOrder)}
          >
            {filtered.map(entry => {
              const { id } = entry;
              return (
                <EntryContainer
                  key={id}
                  id={id}
                  entry={entry}
                  style={styles.block}
                  inactive={!sortable}
                />
              );
            })}
          </SortableGrid>
        )}
        {displayType.name === 'list' && (
          <SortableGrid
            itemsPerRow={1}
            blockHeight={100}
            itemOrder={order}
            onDragRelease={({ itemOrder }) => rearrange(itemOrder)}
          >
            {filtered.map(entry => {
              const { id } = entry;
              return (
                <EntryContainer
                  key={id}
                  id={id}
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
  }
}

export default CountersCollection;
