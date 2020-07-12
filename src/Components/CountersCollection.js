import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { SortableGrid } from './';
import { EntryContainer } from '../Containers';
import { color, fontSizes, fonts } from '../config/styles';
import metrics from '../config/metrics';

const styles = StyleSheet.create({
  countersCollection: {
    marginBottom: metrics.navBarHeight,
  },
  block: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchInput: {
    backgroundColor: color.COLOR_SECONDARY,
    color: color.COLOR_TERTIARY,
  },
  search: {
    backgroundColor: color.COLOR_SECONDARY,
    borderRadius: 0,
    color: color.COLOR_TERTIARY,
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
      <View style={styles.countersCollection}>
        <Searchbar
          placeholder="Search"
          onChangeText={value => this.setState(() => ({ searchQuery: value.toLowerCase() }))}
          value={searchQuery}
          inputStyle={styles.searchInput}
          style={styles.search}
          iconColor={styles.search.color}
        />
        <SortableGrid
          itemsPerRow={displayType.name === 'grid' ? metrics.blocksPerLine : 1}
          blockHeight={displayType.name === 'grid' ? metrics.blockHeightGrid : metrics.blockHeightList}
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
      </View>
    );
  }
}

export default CountersCollection;
