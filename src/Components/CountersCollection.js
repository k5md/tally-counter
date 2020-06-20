import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { SortableGrid } from './';
import { EntryContainer } from '../Containers';

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

export class CountersCollection extends React.Component {
  constructor() {
    super();
    this.ordered = false;
  }

  state = {
    searchQuery: '',
  };

  shouldComponentUpdate({ data, displayType, order }, { searchQuery }) {
    return true;
    const sameData = this.props.data === data;
    const sameDisplayType = this.props.displayType === displayType;
    const sameProps = sameData && sameDisplayType;

    const sameSearchQuery = this.state.searchQuery === searchQuery;

    console.log(
      JSON.stringify({
        sameData,
        sameDisplayType,
        sameProps,
        sameSearchQuery,
        ordered: this.ordered,
      }),
    );

    if (sameProps && sameSearchQuery && this.ordered) {
      return false;
    }

    if (sameProps && sameSearchQuery && !this.ordered) {
      return true;
    }

    if (!sameDisplayType && this.ordered && sameSearchQuery) {
      this.ordered = false;
      return true;
    }
    return sameData || sameSearchQuery;
  }

  render() {
    // NOTE: nope, we can not just write itemsPerRow={display.name === 'grid'...}, because SortableGrid does
    // not support dynamic grid dimension changes
    // console.log('RERENDER', JSON.stringify(this.props.data), JSON.stringify(this.props.order));

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
